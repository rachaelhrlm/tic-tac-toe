import React, { FunctionComponent, useEffect, useState } from 'react';
import { BiX } from 'react-icons/bi';
import { MdOutlineRefresh } from 'react-icons/md';
import { GameMode, RoundResultsModal, IconDisplay, Button, GameBoard, ScoreBoard } from '..';
import { GameService } from '../../services';
import { GameBoardType } from '../../types';

type Move = number[];
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

    const otherPlayerMark: number = playerMark === 1 ? 2 : 1;

    useEffect(() => {
        if (winner !== undefined) setScoreBoard({ ...scoreBoard, [winner]: scoreBoard[winner] + 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [winner]);

    useEffect(() => {
        if (playerMark === 2 && !!gameMode && winner === undefined && Object.values(gameBoard).every((value) => value === 0))
            computerMove(gameBoard);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameMode, playerMark, winner, gameBoard]);

    const clearBoard = () => {
        setWinner(undefined);
        setWinningMove(undefined);
        setGameBoard({ ...initialBoard });
    };

    const onRoundOver = (winningMove: number[], playerMark: number) => {
        setWinner(playerMark);
        setWinningMove(winningMove);
        setIsRoundOver(true);
    };

    const userMove = (tile: number, board: Record<number, number>) => {
        if (board[tile] === 0) {
            const newBoard = GameService.setMark(board, tile, playerMark);
            setGameBoard(newBoard);
            const winningMove = GameService.getWinningMove(newBoard);
            if (winningMove) {
                onRoundOver(winningMove, playerMark);
            } else computerMove(newBoard);
        }
    };

    const computerMove = (board: Record<number, number>) => {
        const tile = Math.floor(Math.random() * 9);

        if (board[tile] === 0) {
            const newBoard = GameService.setMark(board, tile, otherPlayerMark);
            setGameBoard(newBoard);
            const winningMove = GameService.getWinningMove(newBoard);
            if (winningMove) {
                onRoundOver(winningMove, otherPlayerMark);
            }
        } else if (Object.values(board).some((value) => value === 0)) {
            computerMove(board);
        } else {
            setWinner(0);
            setIsRoundOver(true);
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

            <div className="grid grid-cols-3 gap-6">
                <IconDisplay />
                <Button styling="tertiary">
                    <span className="flex place-items-center">
                        <BiX size={30} strokeWidth={2} /> Turn
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
                        if (!winner) userMove(index, { ...gameBoard });
                    }}
                    winningMove={winningMove}
                />
                <ScoreBoard oScore={scoreBoard[2]} tieScore={scoreBoard[0]} xScore={scoreBoard[1]} />
            </div>
        </>
    );
};
