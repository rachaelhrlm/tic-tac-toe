import classNames from 'classnames';
import React, { FunctionComponent, useEffect } from 'react';
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
                <p className="text-9xl sm:text-7xl md:text-8xl lg:text-9xl">
                    <BiX strokeWidth={2} />
                </p>
                <p className="text-center">Takes the round</p>
            </span>
        );
    } else if (winner === 2) {
        roundResults = (
            <span className="text-yellow-500 flex justify-center place-items-center">
                <p className="text-9xl sm:text-7xl md:text-6xl lg:text-9xl">
                    <BiRadioCircle strokeWidth={2} />
                </p>
                <p className="text-center">Takes the round</p>
            </span>
        );
    }

    let winningPlayer = 'No one';
    if (gameMode === GameMode.SOLO) {
        if (winner === playerMark) {
            winningPlayer = 'Player 1';
        } else if (winner !== 0) {
            winningPlayer = 'Player 2';
        }
    } else if (winner === playerMark) {
        winningPlayer = 'You';
    } else if (winner !== 0) {
        winningPlayer = 'Computer';
    }

    const quitButtonRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (quitButtonRef?.current && isRoundOver) {
            quitButtonRef.current.focus();
        }
    }, [isRoundOver]);

    return (
        <>
            <aside
                className={classNames(
                    'absolute h-screen w-screen bg-black-700 transition-all duration-1000 ease-in-out z-10 overflow-hidden',
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
                        'bg-black-600 uppercase font-bold px-10 py-16',
                        { hidden: !isRoundOver },
                        {
                            block: isRoundOver,
                        },
                    )}>
                    <div className="text-center text-gray-400 text-lg pb-5">{winningPlayer} won!</div>
                    <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl">{roundResults}</span>
                    <span className="flex gap-4 justify-center pb-2 pt-5 sm:text-lg">
                        <Button
                            buttonRef={quitButtonRef}
                            extraClasses="sm:p-4"
                            onClick={onClickQuit}
                            styling="inverse-tertiary"
                            tabIndex={isRoundOver ? 10 : -1}>
                            Quit
                        </Button>
                        <Button
                            extraClasses="sm:p-4"
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
