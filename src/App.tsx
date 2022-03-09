import classNames from 'classnames';
import React, { useState } from 'react';
import { BiX, BiRefresh, BiRadioCircle } from 'react-icons/bi';

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
            checkMoves();
            if (!winner) computerMove();
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
            }
            if (move.every((num) => board[num[0]][num[1]] === 2)) {
                setWinningMove(move);
                setWinner(2);
                setScoreBoard({ ...scoreBoard, 2: scoreBoard[2] + 1 });
            }
        });
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
                    <div className="flex gap-1 justify-center place-items-center bg-black-500 shadow-solid-black rounded-xl w-32 uppercase text-gray-300 text-sm font-semibold">
                        <BiX size={30} strokeWidth={2} /> Turn
                    </div>
                    <button className="flex justify-end" onClick={() => clearBoard()}>
                        <BiRefresh className="cursor-pointer bg-gray-400 rounded-lg shadow-solid-gray text-black-500" size={40} />
                    </button>
                    {board.map((row, indexX) => {
                        return row.map((col, indexY) => {
                            let isWinningMove = !!winningMove?.map((move) => move.toString()).includes([indexX, indexY].toString());
                            const isXWinner = isWinningMove && winner === 1;
                            const isOWinner = isWinningMove && winner === 2;

                            return (
                                <div
                                    key={`${indexX}-${indexY}`}
                                    onClick={() => {
                                        if (!winner) userMove(indexX, indexY);
                                    }}
                                    className={classNames(
                                        'grid place-items-center bg-black-500 shadow-solid-black rounded-xl h-32 w-32 cursor-pointer text-white',
                                        { 'bg-cyan-500 shadow-solid-cyan': isXWinner },
                                        { 'bg-pink-500 shadow-solid-pink': isOWinner },
                                    )}>
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
                                </div>
                            );
                        });
                    })}
                    <div
                        className={classNames('grid place-items-center bg-cyan-500 rounded-lg shadow-solid-cyan cursor-pointer text-black-500')}>
                        <p>X</p>
                        <p>{scoreBoard[1]}</p>
                    </div>
                    <div
                        className={classNames(
                            'grid place-items-center bg-gray-400 rounded-lg shadow-solid-gray  cursor-pointer text-black-500',
                        )}>
                        <p>Tie</p>
                        <p>{scoreBoard[0]}</p>
                    </div>
                    <div
                        className={classNames('grid place-items-center bg-pink-500 rounded-lg shadow-solid-pink cursor-pointer text-black-500')}>
                        <p>O</p>
                        <p>{scoreBoard[2]}</p>
                    </div>
                </div>
            </div>
            {winner}
        </div>
    );
};

export default App;
