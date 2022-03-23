import classNames from 'classnames';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { GameMode, RoundResultsModal, IconDisplay, GameBoard, ScoreBoard, RestartButton, TurnDisplay } from '..';
import { GameService } from '../../services';
import { GameBoardType, Move } from '../../types';

export interface GameProps {
    gameMode: GameMode;
    onClickQuit: () => void;
    playerMark: number;
}

export const Game: FunctionComponent<GameProps> = ({ gameMode, onClickQuit, playerMark }) => {
    const [gameBoard, setGameBoard] = useState(GameService.initialBoard);
    const [winningMove, setWinningMove] = useState<Move>();
    const [winner, setWinner] = useState<number>();
    const [isRoundOver, setIsRoundOver] = useState<boolean>(false);
    const [scoreBoard, setScoreBoard] = useState(GameService.initialScoreBoard);
    const [turn, setTurn] = useState<number>(1);

    const otherPlayerMark: number = playerMark === 1 ? 2 : 1;
    const isCpuMode = gameMode !== GameMode.SOLO;
    const isCpuFirst = playerMark === 2;
    const hasWinner = winner !== undefined;
    const isXTurn = turn === 1;
    const isBoardEmpty = Object.values(gameBoard).every((value) => value === 0);
    const hasEmptyTiles = Object.values(gameBoard).some((value) => value === 0);

    useEffect(() => {
        if (hasWinner) setScoreBoard({ ...scoreBoard, [winner]: scoreBoard[winner] + 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [winner]);

    useEffect(() => {
        if (isCpuFirst && isCpuMode && !hasWinner && isBoardEmpty && isXTurn) computerMove(gameBoard);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameMode, playerMark, winner, gameBoard]);

    useEffect(() => {
        if (!hasEmptyTiles && !hasWinner) {
            setWinner(0);
            setIsRoundOver(true);
        }
    }, [hasEmptyTiles, hasWinner]);

    const resetBoard = () => {
        setTurn(1);
        setWinner(undefined);
        setWinningMove(undefined);
        setGameBoard({ ...GameService.initialBoard });
    };

    const onRoundOver = (winningMove: number[], playerMark: number) => {
        setTurn(1);
        setWinner(playerMark);
        setWinningMove(winningMove);
        setIsRoundOver(true);
    };

    const userMove = (tile: number, board: Record<number, number>, mark: number) => {
        if (board[tile] === 0) {
            const newBoard = GameService.setMark(board, tile, mark);
            setTurn(mark === 1 ? 2 : 1);
            setGameBoard(newBoard);
            const winningMove = GameService.getWinningMove(newBoard);
            if (winningMove) {
                onRoundOver(winningMove, mark);
            } else if (gameMode !== GameMode.SOLO) {
                setTimeout(() => {
                    computerMove(newBoard);
                }, 2000);
            }
        }
    };

    const endComputerMove = (board: GameBoardType) => {
        setGameBoard(board);
        setTurn(playerMark);
        const winningMove = GameService.getWinningMove(board);
        if (winningMove) {
            onRoundOver(winningMove, otherPlayerMark);
        }
    };

    const computerMove = (board: GameBoardType) => {
        if (gameMode === GameMode.CPU_HARD) {
            let newBoard;
            let movesToBlock = GameService.getMovesToBlock(board, playerMark);
            let movesToWin = GameService.getMovesToWin(board, otherPlayerMark);
            let randomMove = GameService.getSmartRandomMove(board, otherPlayerMark);
            let tileToMark: number | undefined;

            if (movesToWin !== undefined) {
                tileToMark = movesToWin;
            } else if (movesToBlock !== undefined) {
                tileToMark = movesToBlock;
            } else {
                tileToMark = randomMove;
            }

            if (tileToMark !== undefined) {
                newBoard = GameService.setMark(board, tileToMark, otherPlayerMark);
            }

            if (newBoard) {
                endComputerMove(newBoard);
            }
        } else {
            const tileToMark = GameService.getRandomMove(board);

            if (tileToMark !== undefined) {
                const newBoard = GameService.setMark(board, tileToMark, otherPlayerMark);
                endComputerMove(newBoard);
            }
        }
    };

    return (
        <>
            <RoundResultsModal
                gameMode={gameMode}
                winner={winner}
                playerMark={playerMark}
                isRoundOver={isRoundOver}
                onClickQuit={() => {
                    setIsRoundOver(false);
                    resetBoard();
                    setScoreBoard(GameService.initialScoreBoard);
                    onClickQuit();
                }}
                onClickNextRound={() => {
                    setIsRoundOver(false);
                    resetBoard();
                }}
                onClose={() => setIsRoundOver(false)}
            />
            <div className="relative w-11/12 sm:w-1/2 lg:w-5/12 xl:w-1/4">
                <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full place-items-center">
                    <span className="flex justify-self-start">
                        <IconDisplay />
                    </span>
                    <TurnDisplay turn={turn} />
                    <div className="flex w-full justify-end text-3xl">
                        <RestartButton isDisabled={turn !== playerMark && gameMode !== GameMode.SOLO} onClick={() => resetBoard()} />
                    </div>
                </div>
                <GameBoard
                    gameBoard={gameBoard}
                    onTileClick={(index: number) => {
                        if (!winner && (turn === playerMark || gameMode === GameMode.SOLO)) userMove(index, { ...gameBoard }, turn);
                    }}
                    winningMove={winningMove}
                />
                <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6">
                    <ScoreBoard oScore={scoreBoard[2]} tieScore={scoreBoard[0]} xScore={scoreBoard[1]} />
                </div>
                <div
                    className={classNames(
                        'text-gray-400 -bottom-10 absolute transition-all duration-100 uppercase w-full flex place-content-center',
                        {
                            'opacity-0': turn !== otherPlayerMark || winner !== undefined || gameMode === GameMode.SOLO,
                        },
                        {
                            'opacity-100': turn === otherPlayerMark && winner === undefined && gameMode !== GameMode.SOLO,
                        },
                    )}>
                    Computer is thinking...
                </div>
            </div>
        </>
    );
};
