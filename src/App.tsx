import React, { useEffect, useState } from 'react';
import { BiX } from 'react-icons/bi';
import { MdOutlineRefresh } from 'react-icons/md';

import { Button, GameButton, GameMode, GameSetup, IconDisplay, RoundResultsModal, ScoreBoard } from './components';
import { GameService } from './services';
import { GameBoardType } from './types';

type Move = number[];
const initialBoard: GameBoardType = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
const initialScoreBoard: Record<number, number> = { 0: 0, 1: 0, 2: 0 };
const App = () => {
    const [board, setBoard] = useState(initialBoard);
    const [winningMove, setWinningMove] = useState<Move>();
    const [playerMark, setPlayerMark] = useState<number>(1);
    const [winner, setWinner] = useState<number>();
    const [gameMode, setGameMode] = useState<GameMode>();
    const [isRoundOver, setIsRoundOver] = useState<boolean>(false);
    const [scoreBoard, setScoreBoard] = useState(initialScoreBoard);

    const onRoundOver = (winningMove: number[], playerMark: number) => {
        setWinner(playerMark);
        setWinningMove(winningMove);
        setIsRoundOver(true);
    };

    const userMove = (tile: number, board: Record<number, number>) => {
        if (board[tile] === 0) {
            const newBoard = GameService.setMark(board, tile, playerMark);
            setBoard(newBoard);
            const winningMove = GameService.getWinningMove(newBoard);
            if (winningMove) {
                onRoundOver(winningMove, playerMark);
            } else computerMove(newBoard);
        }
    };

    const computerMove = (board: Record<number, number>) => {
        const tile = Math.floor(Math.random() * 9);
        const computerMark: number = playerMark === 1 ? 2 : 1;

        if (board[tile] === 0) {
            const newBoard = GameService.setMark(board, tile, computerMark);
            setBoard(newBoard);
            const winningMove = GameService.getWinningMove(newBoard);
            if (winningMove) {
                onRoundOver(winningMove, computerMark);
            }
        } else if (Object.values(board).some((value) => value === 0)) {
            computerMove(board);
        } else {
            setWinner(0);
            setIsRoundOver(true);
        }
    };

    useEffect(() => {
        if (playerMark === 2 && !!gameMode && winner === undefined && Object.values(board).every((value) => value === 0)) computerMove(board);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameMode, playerMark, winner, board]);

    useEffect(() => {
        if (winner !== undefined) setScoreBoard({ ...scoreBoard, [winner]: scoreBoard[winner] + 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [winner]);

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
