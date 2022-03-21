import React, { FunctionComponent } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';

interface TurnDisplayProps {
    turn: number;
}

export const TurnDisplay: FunctionComponent<TurnDisplayProps> = ({ turn }) => {
    const isXTurn = turn === 1;
    return (
        <span className="flex place-items-center justify-center rounded-xl font-bold uppercase p-2 text-sm bg-black-500 shadow-solid-black text-gray-400 w-full">
            <h1 className="text-2xl m-0 flex sm:text-3xl">
                {isXTurn ? <BiX strokeWidth={2} data-testid="x-mark" /> : <BiRadioCircle strokeWidth={2} data-testid="o-mark" />}
            </h1>
            <p className="pr-1">Turn</p>
        </span>
    );
};
