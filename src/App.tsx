import classNames from 'classnames';
import React, { useState } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';
import { MdOutlineRefresh } from 'react-icons/md';

import { Button, GameButton, GameValue, RoundResultsModal } from './components';

type Move = number[][];
enum GameMode {
    CPU_EASY = 'CPU_EASY',
}

const App = () => {
    const [board, setBoard] = useState<GameValue[][]>([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]);
    const [winningMove, setWinningMove] = useState<Move>();
    const [playerMark, setplayerMark] = useState(1);
    const [winner, setWinner] = useState<GameValue>();
    const [gameMode, setGameMode] = useState<GameMode>();
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
        <div className="bg-black-600 h-screen w-screen">
            <div className="w-full h-full grid place-items-center">
                {!gameMode ? (
                    <div className="grid grid-col-1 place-items-center gap-10 w-1/3">
                        <div className="flex gap-1">
                            <BiX className="text-cyan-500" viewBox="0 0 20 20" size={40} strokeWidth={2} />
                            <BiRadioCircle viewBox="0 0 20 20" className="text-pink-500" size={40} strokeWidth={2} />
                        </div>
                        <div className="bg-black-500 rounded-lg shadow-solid-black text-gray-400 uppercase grid grid-cols-1 w-full p-5 place-items-center gap-3">
                            <div className="font-bold text-lg p-5">Pick Player 1's Mark</div>
                            <div className="bg-black-600 w-full rounded-lg flex justify-between">
                                <div
                                    className={classNames(
                                        'flex border-8 border-black-600 rounded-xl justify-center w-1/2 cursor-pointer hover:bg-cyan-500 transition-all duration-500',
                                        { 'text-gray-400 hover:text-black-600': playerMark !== 1 },
                                        { 'bg-gray-400 text-black-600': playerMark === 1 },
                                    )}
                                    onClick={() => setplayerMark(1)}>
                                    <BiX size={40} strokeWidth={2} />
                                </div>
                                <div
                                    className={classNames(
                                        'flex border-8 border-black-600 rounded-xl justify-center w-1/2 cursor-pointer hover:bg-pink-500 transition-all duration-500',
                                        { 'text-gray-400 hover:text-black-600': playerMark === 1 },
                                        { 'bg-gray-400 text-black-600': playerMark !== 1 },
                                    )}
                                    onClick={() => setplayerMark(2)}>
                                    <BiRadioCircle size={40} strokeWidth={2} />
                                </div>
                            </div>
                            <div className="text-sm opacity-60 p-5">Remember: X Goes first</div>
                        </div>
                        <Button styling="inverse-secondary" extraClasses="w-full p-3" onClick={() => setGameMode(GameMode.CPU_EASY)}>
                            New Game (vs CPU)
                        </Button>
                    </div>
                ) : (
                    <>
                        <RoundResultsModal
                            winner={winner}
                            isRoundOver={isRoundOver}
                            onClickQuit={() => setIsRoundOver(false)}
                            onClickNextRound={() => {
                                setIsRoundOver(false);
                                clearBoard();
                            }}
                        />

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
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
