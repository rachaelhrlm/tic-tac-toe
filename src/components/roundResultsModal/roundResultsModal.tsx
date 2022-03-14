import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';
import { Button } from '..';
import { GameValue } from '../gameButton';

export interface RoundResultsModalProps {
    isRoundOver?: boolean;
    onClickNextRound: () => void;
    onClickQuit: () => void;
    playerMark: GameValue;
    winner?: GameValue;
}

export const RoundResultsModal: FunctionComponent<RoundResultsModalProps> = ({
    isRoundOver,
    onClickNextRound,
    onClickQuit,
    playerMark,
    winner,
}) => {
    let roundResults = <p className="text-gray-400 flex justify-center p-10">It's a tie</p>;
    if (winner === 1) {
        roundResults = (
            <p className="text-cyan-500 flex justify-center place-items-center">
                <BiX size={130} strokeWidth={2} />
                <p>Takes the round</p>
            </p>
        );
    } else if (winner === 2) {
        roundResults = (
            <p className="text-pink-500 flex justify-center place-items-center">
                <BiRadioCircle size={130} strokeWidth={2} />
                <p>Takes the round</p>
            </p>
        );
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
                )}>
                <div
                    className={classNames(
                        'bg-black-600 uppercase font-bold p-20',
                        { hidden: !isRoundOver },
                        {
                            block: isRoundOver,
                        },
                    )}>
                    <div className="text-center text-gray-400 text-lg">
                        {winner === playerMark ? 'You' : winner !== playerMark && winner !== 0 ? 'Computer' : 'No one'} won!
                    </div>
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