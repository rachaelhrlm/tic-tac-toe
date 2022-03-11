import React, { useState } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';
import { MdOutlineRefresh } from 'react-icons/md';

import { Button, ButtonStlye, GameButton, GameValue, RoundResultsModal } from './components';

type Move = number[][];

const App = () => {
    const [board, setBoard] = useState<GameValue[][]>([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]);
    const [winningMove, setWinningMove] = useState<Move>();
    const [winner, setWinner] = useState<GameValue>();
    const [isRoundOver, setIsRoundOver] = useState<boolean>(false);
    const [scoreBoard, setScoreBoard] = useState<{
        0: number;
        1: number;
        2: number;
    }>({ 0: 0, 1: 0, 2: 0 });

    const userMove = (indexX: number, indexY: number) => {
        const newBoard = [...board];
        if (newBoard[indexX][indexY] === 0) {
            newBoard[indexX][indexY] = 1;
            setBoard(newBoard);
            const hasWinner = checkMoves();
            if (!hasWinner) computerMove();
        }
    };

    const computerMove = () => {
        const indexX = Math.floor(Math.random() * 3);
        const indexY = Math.floor(Math.random() * 3);
        const newBoard = [...board];
        if (newBoard[indexX][indexY] === 0) {
            newBoard[indexX][indexY] = 2;
        } else if (newBoard.some((row) => row.some((col) => col === 0))) {
            computerMove();
        } else {
            setWinner(0);
            setScoreBoard({ ...scoreBoard, 0: scoreBoard[0] + 1 });
            setIsRoundOver(true);
        }
        setBoard(newBoard);
        checkMoves();
    };

    const checkMoves = () => {
        let hasWinner = false;
        const winningMoves = [
            [
                [0, 0],
                [0, 1],
                [0, 2],
            ],
            [
                [1, 0],
                [1, 1],
                [1, 2],
            ],
            [
                [2, 0],
                [2, 1],
                [2, 2],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
            ],
            [
                [0, 1],
                [1, 1],
                [2, 1],
            ],
            [
                [0, 2],
                [1, 2],
                [2, 2],
            ],
            [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
            [
                [2, 0],
                [1, 1],
                [0, 2],
            ],
        ];

        winningMoves.forEach((move) => {
            if (move.every((num) => board[num[0]][num[1]] === 1)) {
                setWinningMove(move);
                setWinner(1);
                setScoreBoard({ ...scoreBoard, 1: scoreBoard[1] + 1 });
                hasWinner = true;
            }
            if (move.every((num) => board[num[0]][num[1]] === 2)) {
                setWinningMove(move);
                setWinner(2);
                setScoreBoard({ ...scoreBoard, 2: scoreBoard[2] + 1 });
                hasWinner = true;
            }
        });
        if (hasWinner) setIsRoundOver(true);
        return hasWinner;
    };

    const clearBoard = () => {
        const newBoard: GameValue[][] = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        setWinner(undefined);
        setWinningMove(undefined);
        setBoard(newBoard);
    };

    return (
        <>
            <RoundResultsModal
                winner={winner}
                isRoundOver={isRoundOver}
                onClickNextRound={() => {
                    setIsRoundOver(false);
                    clearBoard();
                }}
            />
            <div className="bg-black-600 h-screen w-screen">
                <div className="w-full h-full grid place-items-center">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="flex gap-1">
                            <BiX className="text-cyan-500" viewBox="0 0 20 20" size={40} strokeWidth={2} />
                            <BiRadioCircle viewBox="0 0 20 20" className="text-pink-500" size={40} strokeWidth={2} />
                        </div>
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
                        {board.map((row, indexX) => {
                            return row.map((col, indexY) => (
                                <GameButton
                                    isInWinningMove={!!winningMove?.map((move) => move.toString()).includes([indexX, indexY].toString())}
                                    onClick={() => {
                                        if (!winner) userMove(indexX, indexY);
                                    }}
                                    value={col}
                                />
                            ));
                        })}
                        <Button styling="inverse-primary">
                            <p>X</p>
                            <p className="text-xl">{scoreBoard[1]}</p>
                        </Button>
                        <Button styling="inverse-tertiary">
                            <p>Ties</p>
                            <p className="text-xl">{scoreBoard[0]}</p>
                        </Button>
                        <Button styling="inverse-secondary">
                            <p>O</p>
                            <p className="text-xl">{scoreBoard[2]}</p>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
