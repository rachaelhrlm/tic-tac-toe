import React, { FunctionComponent } from 'react';
import { IconDisplay, MarkSelect, ModeSelect } from '..';

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
            <MarkSelect onClick={onPlayerMarkSelect} value={playerMark} />
            <ModeSelect onClick={onGameModeSelect} />
        </div>
    );
};
