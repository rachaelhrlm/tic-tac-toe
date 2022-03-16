import classNames from 'classnames';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { BiRadioCircle, BiX } from 'react-icons/bi';
import { MdOutlineRefresh } from 'react-icons/md';
import { GameMode, RoundResultsModal, IconDisplay, Button, GameBoard, ScoreBoard } from '..';
import { GameService } from '../../services';
import { GameBoardType, Move } from '../../types';

const initialBoard: GameBoardType = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
const initialScoreBoard: Record<number, number> = { 0: 0, 1: 0, 2: 0 };

export interface GameProps {
    gameMode: GameMode;
    onClickQuit: () => void;
    playerMark: number;
}

export const Game: FunctionComponent<GameProps> = ({ gameMode, onClickQuit, playerMark }) => {
    const [gameBoard, setGameBoard] = useState(initialBoard);
    const [winningMove, setWinningMove] = useState<Move>();
    const [winner, setWinner] = useState<number>();
    const [isRoundOver, setIsRoundOver] = useState<boolean>(false);
    const [scoreBoard, setScoreBoard] = useState(initialScoreBoard);
    const [turn, setTurn] = useState<number>(1);

    const otherPlayerMark: number = playerMark === 1 ? 2 : 1;

    useEffect(() => {
        if (winner !== undefined) setScoreBoard({ ...scoreBoard, [winner]: scoreBoard[winner] + 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [winner]);

    useEffect(() => {
        if (playerMark === 2 && !!gameMode && winner === undefined && Object.values(gameBoard).every((value) => value === 0) && turn === 1)
            computerMove(gameBoard);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameMode, playerMark, winner, gameBoard]);

    useEffect(() => {
        if (!Object.values(gameBoard).some((value) => value === 0) && winner === undefined) {
            setWinner(0);
            setIsRoundOver(true);
        }
    }, [gameBoard, winner]);

    const clearBoard = () => {
        setTurn(1);
        setWinner(undefined);
        setWinningMove(undefined);
        setGameBoard({ ...initialBoard });
    };

    const onRoundOver = (winningMove: number[], playerMark: number) => {
        setTurn(1);
        setWinner(playerMark);
        setWinningMove(winningMove);
        setIsRoundOver(true);
    };

    const userMove = (tile: number, board: Record<number, number>) => {
        if (board[tile] === 0) {
            const newBoard = GameService.setMark(board, tile, playerMark);
            setTurn(otherPlayerMark);
            setGameBoard(newBoard);
            const winningMove = GameService.getWinningMove(newBoard);
            if (winningMove) {
                onRoundOver(winningMove, playerMark);
            } else
                setTimeout(() => {
                    computerMove(newBoard);
                }, 2000);
        }
    };

    const computerMove = (board: Record<number, number>) => {
        if (gameMode === GameMode.CPU_HARD) {
            let newBoard;
            let movesToBlock = GameService.getMovesToBlock(board, playerMark);
            let movesToWin = GameService.getMovesToWin(board, otherPlayerMark);
            let randomMove = GameService.getRandomMove(board);

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
                setGameBoard(newBoard);
                setTurn(playerMark);
                const winningMove = GameService.getWinningMove(newBoard);
                if (winningMove) {
                    onRoundOver(winningMove, otherPlayerMark);
                }
            }
        } else {
            const tile = GameService.getRandomMove(board);

            if (tile) {
                const newBoard = GameService.setMark(board, tile, otherPlayerMark);
                setGameBoard(newBoard);
                setTurn(playerMark);
                const winningMove = GameService.getWinningMove(newBoard);
                if (winningMove) {
                    onRoundOver(winningMove, otherPlayerMark);
                }
            } else {
                setWinner(0);
                setIsRoundOver(true);
            }
        }
    };

    return (
        <>
            <RoundResultsModal
                winner={winner}
                playerMark={playerMark}
                isRoundOver={isRoundOver}
                onClickQuit={() => {
                    setIsRoundOver(false);
                    clearBoard();
                    setScoreBoard(initialScoreBoard);
                    onClickQuit();
                }}
                onClickNextRound={() => {
                    setIsRoundOver(false);
                    clearBoard();
                }}
                onClose={() => setIsRoundOver(false)}
            />
            <div className="relative">
                <div className="grid grid-cols-3 gap-6">
                    <IconDisplay />
                    <Button styling="tertiary">
                        <span className="flex place-items-center">
                            {turn === 1 ? <BiX size={30} strokeWidth={2} /> : <BiRadioCircle size={30} strokeWidth={2} />} Turn
                        </span>
                    </Button>
                    <div className="flex justify-end">
                        <Button onClick={() => clearBoard()} styling="inverse-tertiary">
                            <MdOutlineRefresh size={40} />
                        </Button>
                    </div>
                    <GameBoard
                        gameBoard={gameBoard}
                        onTileClick={(index: number) => {
                            if (!winner && turn === playerMark) userMove(index, { ...gameBoard });
                        }}
                        winningMove={winningMove}
                    />
                    <ScoreBoard oScore={scoreBoard[2]} tieScore={scoreBoard[0]} xScore={scoreBoard[1]} />
                </div>
                <div
                    className={classNames(
                        'text-gray-400 -bottom-10 absolute transition-all duration-100 uppercase w-full flex place-content-center',
                        {
                            'opacity-0': turn !== otherPlayerMark || winner !== undefined,
                        },
                        {
                            'opacity-100': turn === otherPlayerMark && winner === undefined,
                        },
                    )}>
                    Computer is thinking...
                </div>
            </div>
        </>
    );
};
