import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';
import { Button, GameMode } from '..';

export interface RoundResultsModalProps {
    gameMode?: GameMode;
    isRoundOver?: boolean;
    onClickNextRound: () => void;
    onClickQuit: () => void;
    onClose: () => void;
    playerMark: number;
    winner?: number;
}

export const RoundResultsModal: FunctionComponent<RoundResultsModalProps> = ({
    gameMode,
    isRoundOver,
    onClickNextRound,
    onClickQuit,
    onClose,
    playerMark,
    winner,
}) => {
    let roundResults = <span className="text-gray-400 flex justify-center p-10">It's a tie</span>;
    if (winner === 1) {
        roundResults = (
            <span className="text-cyan-500 flex justify-center place-items-center">
                <BiX size={130} strokeWidth={2} />
                <p>Takes the round</p>
            </span>
        );
    } else if (winner === 2) {
        roundResults = (
            <span className="text-pink-500 flex justify-center place-items-center">
                <BiRadioCircle size={130} strokeWidth={2} />
                <p>Takes the round</p>
            </span>
        );
    }

    let winningPlayer = 'No one';
    if (gameMode === GameMode.SOLO) {
        winner === 1 && winner === playerMark ? (winningPlayer = 'Player 1') : (winningPlayer = 'Player 2');
    } else if (winner === playerMark) {
        winningPlayer = 'You';
    } else if (winner !== 0) {
        winningPlayer = 'Computer';
    }

    return (
        <>
            <aside
                className={classNames(
                    'absolute h-screen w-screen bg-black-700 transition-all duration-1000 ease-in-out z-10',
                    { 'opacity-0 pointer-events-none': !isRoundOver },
                    {
                        'opacity-80 pointer-events-auto': isRoundOver,
                    },
                )}></aside>
            <div
                className={classNames(
                    'absolute w-screen h-screen grid grid-cols-1 justify-center content-center transition-all duration-700 ease-in-out z-20',
                    { 'opacity-0 pointer-events-none': !isRoundOver },
                    {
                        'opacity-100 pointer-events-auto': isRoundOver,
                    },
                )}
                onClick={onClose}>
                <div
                    className={classNames(
                        'bg-black-600 uppercase font-bold p-20',
                        { hidden: !isRoundOver },
                        {
                            block: isRoundOver,
                        },
                    )}>
                    <div className="text-center text-gray-400 text-lg">{winningPlayer} won!</div>
                    <span className="gap-2 text-6xl">{roundResults}</span>
                    <span className="flex gap-4 justify-center pb-2">
                        <Button extraClasses="p-4 text-lg" onClick={onClickQuit} styling="inverse-tertiary">
                            Quit
                        </Button>
                        <Button
                            extraClasses="p-4 text-lg"
                            onClick={onClickNextRound}
                            styling={winner === 1 ? 'inverse-primary' : 'inverse-secondary'}>
                            Next Round
                        </Button>
                    </span>
                </div>
            </div>
        </>
    );
};
