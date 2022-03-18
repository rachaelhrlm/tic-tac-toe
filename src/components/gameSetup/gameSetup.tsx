import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';
import { Button, IconDisplay } from '..';

export enum GameMode {
    CPU_EASY = 'CPU_EASY',
    CPU_HARD = 'CPU_HARD',
}

export interface GameSetupProps {
    isVisible: boolean;
    playerMark: number;
    onPlayerMarkSelect: (playerMark: number) => void;
    onGameModeSelect: (gameMode: GameMode) => void;
}

export const GameSetup: FunctionComponent<GameSetupProps> = ({ isVisible, playerMark, onGameModeSelect, onPlayerMarkSelect }) => {
    if (!isVisible) return null;
    return (
        <div className="grid grid-col-1 place-items-center gap-10 w-1/3">
            <IconDisplay />
            <div className="bg-black-500 rounded-lg shadow-solid-black text-gray-400 uppercase grid grid-cols-1 w-full p-5 place-items-center gap-3">
                <div className="font-bold text-lg p-5">Pick Player 1's Mark</div>
                <div className="bg-black-600 w-full rounded-lg flex justify-between text-5xl">
                    <div
                        className={classNames(
                            'flex border-8 border-black-600 rounded-xl justify-center w-1/2 cursor-pointer hover:bg-cyan-500 transition-all duration-500',
                            { 'text-gray-400 hover:text-black-600': playerMark !== 1 },
                            { 'bg-gray-400 text-black-600': playerMark === 1 },
                        )}
                        onClick={() => onPlayerMarkSelect(1)}>
                        <BiX strokeWidth={2} />
                    </div>
                    <div
                        className={classNames(
                            'flex border-8 border-black-600 rounded-xl justify-center w-1/2 cursor-pointer hover:bg-pink-500 transition-all duration-500',
                            { 'text-gray-400 hover:text-black-600': playerMark === 1 },
                            { 'bg-gray-400 text-black-600': playerMark !== 1 },
                        )}
                        onClick={() => onPlayerMarkSelect(2)}>
                        <BiRadioCircle strokeWidth={2} />
                    </div>
                </div>
                <div className="text-sm opacity-60 p-5">Remember: X Goes first</div>
            </div>

            <div className="w-full">
                <div className="flex">
                    <div className="bg-black-500 rounded-t-lg px-10 py-3 font-bold text-gray-400 uppercase text-lg">CPU</div>
                </div>
                <div className="bg-black-500 rounded-b-lg rounded-tr-lg shadow-solid-black text-gray-400 uppercase grid grid-cols-1 w-full p-5 place-items-center gap-3">
                    <div className="bg-black-600 w-full rounded-lg flex justify-between">
                        <Button
                            styling="inverse-secondary"
                            extraClasses="w-full p-3 hover:scale-100 hover:bg-gray-400 transition-colors duration-500 border-8 border-black-600 shadow-none"
                            onClick={() => onGameModeSelect(GameMode.CPU_EASY)}>
                            Easy Mode
                        </Button>
                        <Button
                            styling="inverse-primary"
                            extraClasses="w-full p-3 hover:scale-100 hover:bg-gray-400 transition-colors duration-500 border-8 border-black-600 shadow-none"
                            onClick={() => onGameModeSelect(GameMode.CPU_HARD)}>
                            Hard Mode
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
