import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';
import { Button, IconDisplay, MarkSelect } from '..';

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
