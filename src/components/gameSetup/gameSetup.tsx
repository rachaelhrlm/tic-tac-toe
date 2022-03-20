import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';
import { Button, IconDisplay } from '..';

export enum GameMode {
    CPU_EASY = 'CPU_EASY',
    CPU_HARD = 'CPU_HARD',
    SOLO = 'SOLO',
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
        <div className="grid grid-col-1 place-items-center gap-10 w-11/12 xl:w-1/2 2xl:w-1/3">
            <IconDisplay />
            <div className="bg-black-500 rounded-lg shadow-solid-black text-gray-400 uppercase grid grid-cols-1 w-full p-5 place-items-center gap-3">
                <div className="font-bold text-lg p-5">Pick Player 1's Mark</div>
                <div className="bg-black-600 w-full rounded-lg flex justify-between text-5xl">
                    <button
                        className={classNames(
                            'flex border-8 border-black-600 rounded-xl justify-center w-1/2 cursor-pointer hover:bg-cyan-500 transition-all duration-500',
                            { 'text-gray-400 hover:text-black-600': playerMark !== 1 },
                            { 'bg-gray-400 text-black-600': playerMark === 1 },
                        )}
                        onClick={() => onPlayerMarkSelect(1)}>
                        <BiX strokeWidth={2} />
                    </button>
                    <button
                        className={classNames(
                            'flex border-8 border-black-600 rounded-xl justify-center w-1/2 cursor-pointer hover:bg-pink-500 transition-all duration-500',
                            { 'text-gray-400 hover:text-black-600': playerMark === 1 },
                            { 'bg-gray-400 text-black-600': playerMark !== 1 },
                        )}
                        onClick={() => onPlayerMarkSelect(2)}>
                        <BiRadioCircle strokeWidth={2} />
                    </button>
                </div>
                <div className="text-sm opacity-60 p-5">Remember: X Goes first</div>
            </div>

            <div className="w-full text-lg grid grid-col-1 gap-6 sm:flex sm:gap-4">
                <Button styling="inverse-secondary" extraClasses="w-full rounded-md" onClick={() => onGameModeSelect(GameMode.SOLO)}>
                    Solo
                </Button>
                <Button styling="inverse-primary" extraClasses="w-full rounded-md" onClick={() => onGameModeSelect(GameMode.CPU_EASY)}>
                    CPU (Easy Mode)
                </Button>
                <Button styling="inverse-tertiary" extraClasses="w-full rounded-md" onClick={() => onGameModeSelect(GameMode.CPU_HARD)}>
                    CPU (Hard Mode)
                </Button>
            </div>
        </div>
    );
};
