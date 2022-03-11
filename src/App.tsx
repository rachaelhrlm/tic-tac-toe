import classNames from 'classnames';
import React, { useState } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';
import { MdOutlineRefresh } from 'react-icons/md';

import { Button, ButtonStlye } from './components';

type Move = number[][];

const App = () => {
    const [board, setBoard] = useState<number[][]>([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]);
    const [winningMove, setWinningMove] = useState<Move>();
    const [winner, setWinner] = useState<number>();
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
        return hasWinner;
    };

    const clearBoard = () => {
        const newBoard = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        setWinner(undefined);
        setWinningMove(undefined);
        setBoard(newBoard);
    };

    return (
        <div className="bg-black-600 h-screen w-screen">
            <div className="w-full h-full grid place-items-center">
                <div className="grid grid-cols-3 gap-6">
                    <div className="flex">
                        <BiX className="text-cyan-500" viewBox="0 0 20 20" size={40} strokeWidth={2} />{' '}
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
                        return row.map((col, indexY) => {
                            let isWinningMove = !!winningMove?.map((move) => move.toString()).includes([indexX, indexY].toString());
                            const isXWinner = isWinningMove && winner === 1;
                            const isOWinner = isWinningMove && winner === 2;

                            let buttonStyling: ButtonStlye = 'primary';
                            if (isXWinner) {
                                buttonStyling = 'inverse-primary';
                            } else if (isOWinner) {
                                buttonStyling = 'inverse-secondary';
                            } else if (col === 2) {
                                buttonStyling = 'secondary';
                            }

                            return (
                                <Button
                                    extraClasses="h-32 w-32"
                                    key={`${indexX}-${indexY}`}
                                    styling={buttonStyling}
                                    onClick={() => {
                                        if (!winner) userMove(indexX, indexY);
                                    }}
                                    //     className={classNames(
                                    //         'grid place-items-center bg-black-500 shadow-solid-black rounded-xl h-32 w-32 cursor-pointer text-white hover:scale-110 transition-all',
                                    //         { 'bg-cyan-500 shadow-solid-cyan': isXWinner },
                                    //         { 'bg-pink-500 shadow-solid-pink': isOWinner },
                                    // )}
                                >
                                    {col === 1 ? (
                                        <BiX
                                            className={classNames('text-cyan-500', { ' text-black-500': isWinningMove })}
                                            size={100}
                                            strokeWidth={2}
                                        />
                                    ) : col === 2 ? (
                                        <BiRadioCircle
                                            className={classNames('text-pink-500', { ' text-black-500': isWinningMove })}
                                            size={100}
                                            strokeWidth={2}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </Button>
                            );
                        });
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
            {winner}
        </div>
    );
};

export default App;
