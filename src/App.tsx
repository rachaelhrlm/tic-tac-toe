import React, { useEffect, useState } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';
import { MdOutlineRefresh } from 'react-icons/md';

import { Button, GameButton, GameMode, GameSetup, IconDisplay, RoundResultsModal, ScoreBoard } from './components';

type Move = number[];
const initialBoard: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
const initialScoreBoard: Record<number, number> = { 0: 0, 1: 0, 2: 0 };
const App = () => {
    const [board, setBoard] = useState(initialBoard);
    const [winningMove, setWinningMove] = useState<Move>();
    const [playerMark, setPlayerMark] = useState<number>(1);
    const [winner, setWinner] = useState<number>();
    const [gameMode, setGameMode] = useState<GameMode>();
    const [isRoundOver, setIsRoundOver] = useState<boolean>(false);
    const [scoreBoard, setScoreBoard] = useState(initialScoreBoard);

    const userMove = (tile: number, board: Record<number, number>) => {
        if (board[tile] === 0) {
            const newBoard = { ...board, [tile]: playerMark };
            setBoard(newBoard);
            const hasWinner = checkMoves(newBoard);
            if (!hasWinner) computerMove(newBoard);
        }
    };

    const computerMove = (board: Record<number, number>) => {
        const tile = Math.floor(Math.random() * 9);
        if (board[tile] === 0) {
            const newBoard = { ...board, [tile]: playerMark === 1 ? 2 : 1 };
            setBoard(newBoard);
            checkMoves(newBoard);
        } else if (Object.values(board).some((value) => value === 0)) {
            computerMove(board);
        } else {
            setWinner(0);
            setScoreBoard({ ...scoreBoard, 0: scoreBoard[0] + 1 });
            setIsRoundOver(true);
        }
    };

    useEffect(() => {
        if (playerMark === 2 && !!gameMode && winner === undefined && Object.values(board).every((value) => value === 0)) computerMove(board);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameMode, playerMark, winner, board]);

    const checkMoves = (board: Record<number, number>) => {
        let hasWinner = false;
        const winningMoves = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        winningMoves.forEach((move) => {
            const computerMark = playerMark === 1 ? 2 : 1;

            if (move.every((tile) => board[tile] === playerMark)) {
                setWinningMove(move);
                setWinner(playerMark);
                setScoreBoard({ ...scoreBoard, [playerMark]: scoreBoard[playerMark] + 1 });
                hasWinner = true;
            }
            if (move.every((tile) => board[tile] === computerMark)) {
                setWinningMove(move);
                setWinner(computerMark);
                setScoreBoard({ ...scoreBoard, [computerMark]: scoreBoard[computerMark] + 1 });
                hasWinner = true;
            }
        });
        if (!hasWinner && !Object.values(board).some((value) => value === 0)) {
            setWinner(0);
            setScoreBoard({ ...scoreBoard, 0: scoreBoard[0] + 1 });

            hasWinner = true;
        }
        if (hasWinner) setIsRoundOver(true);
        return hasWinner;
    };

    const clearBoard = () => {
        setWinner(undefined);
        setWinningMove(undefined);
        setBoard({ ...initialBoard });
    };

    return (
        <div className="bg-black-600 h-screen w-screen">
            <div className="w-full h-full grid place-items-center">
                <GameSetup
                    isVisible={!gameMode}
                    playerMark={playerMark}
                    onPlayerMarkSelect={(playerMark: number) => setPlayerMark(playerMark)}
                    onGameModeSelect={(gameMode: GameMode) => setGameMode(gameMode)}
                />
                {!!gameMode && (
                    <>
                        <RoundResultsModal
                            winner={winner}
                            playerMark={playerMark}
                            isRoundOver={isRoundOver}
                            onClickQuit={() => {
                                setIsRoundOver(false);
                                clearBoard();
                                setPlayerMark(1);
                                setScoreBoard(initialScoreBoard);
                                setGameMode(undefined);
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
                            {Object.values(board).map((value, index) => (
                                <GameButton
                                    isInWinningMove={!!winningMove?.map((move) => move.toString()).includes([index].toString())}
                                    key={index}
                                    onClick={() => {
                                        if (!winner) userMove(index, { ...board });
                                    }}
                                    value={value}
                                />
                            ))}
                            <ScoreBoard oScore={scoreBoard[2]} tieScore={scoreBoard[0]} xScore={scoreBoard[1]} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
