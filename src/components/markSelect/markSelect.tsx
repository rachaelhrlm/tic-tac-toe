import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';

interface MarkSelectProps {
    onClick: (value: number) => void;
    value: number;
}

export const MarkSelect: FunctionComponent<MarkSelectProps> = ({ onClick, value }) => {
    return (
        <section className="bg-black-500 rounded-lg shadow-solid-black text-gray-400 uppercase grid grid-cols-1 w-full p-5 place-items-center gap-3">
            <h1 className="font-bold text-lg p-5">Pick Player 1's Mark</h1>
            <div className="bg-black-600 w-full rounded-lg flex justify-between text-5xl">
                <button
                    aria-label="Select X mark"
                    className={classNames(
                        'flex border-8 border-black-600 rounded-xl justify-center w-1/2 cursor-pointer hover:bg-cyan-500 transition-all duration-500',
                        { 'text-gray-400 hover:text-black-600': value !== 1 },
                        { 'bg-gray-400 text-black-600': value === 1 },
                    )}
                    data-testid="x-button"
                    onClick={() => onClick(1)}>
                    <BiX strokeWidth={2} />
                </button>
                <button
                    aria-label="Select O mark"
                    className={classNames(
                        'flex border-8 border-black-600 rounded-xl justify-center w-1/2 cursor-pointer hover:bg-yellow-500 transition-all duration-500',
                        { 'text-gray-400 hover:text-black-600': value === 1 },
                        { 'bg-gray-400 text-black-600': value !== 1 },
                    )}
                    data-testid="o-button"
                    onClick={() => onClick(2)}>
                    <BiRadioCircle strokeWidth={2} />
                </button>
            </div>
            <p className="text-sm opacity-60 p-5">Remember: X Goes First</p>
        </section>
    );
};
