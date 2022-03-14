import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';
import { Button } from '..';

export enum GameMode {
    CPU_EASY = 'CPU_EASY',
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
                        onClick={() => onPlayerMarkSelect(1)}>
                        <BiX size={40} strokeWidth={2} />
                    </div>
                    <div
                        className={classNames(
                            'flex border-8 border-black-600 rounded-xl justify-center w-1/2 cursor-pointer hover:bg-pink-500 transition-all duration-500',
                            { 'text-gray-400 hover:text-black-600': playerMark === 1 },
                            { 'bg-gray-400 text-black-600': playerMark !== 1 },
                        )}
                        onClick={() => onPlayerMarkSelect(2)}>
                        <BiRadioCircle size={40} strokeWidth={2} />
                    </div>
                </div>
                <div className="text-sm opacity-60 p-5">Remember: X Goes first</div>
            </div>
            <Button styling="inverse-secondary" extraClasses="w-full p-3" onClick={() => onGameModeSelect(GameMode.CPU_EASY)}>
                New Game (vs CPU)
            </Button>
        </div>
    );
};
