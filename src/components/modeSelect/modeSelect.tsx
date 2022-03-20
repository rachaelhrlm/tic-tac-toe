import React, { FunctionComponent } from 'react';
import { Button, GameMode } from '..';

interface ModeSelectProps {
    onClick: (gameMode: GameMode) => void;
}

export const ModeSelect: FunctionComponent<ModeSelectProps> = ({ onClick }) => {
    return (
        <div className="w-full text-lg grid grid-col-1 gap-6 sm:flex sm:gap-4">
            <Button styling="inverse-secondary" extraClasses="w-full rounded-md" onClick={() => onClick(GameMode.SOLO)}>
                Solo
            </Button>
            <Button styling="inverse-primary" extraClasses="w-full rounded-md" onClick={() => onClick(GameMode.CPU_EASY)}>
                CPU (Easy Mode)
            </Button>
            <Button styling="inverse-tertiary" extraClasses="w-full rounded-md" onClick={() => onClick(GameMode.CPU_HARD)}>
                CPU (Hard Mode)
            </Button>
        </div>
    );
};
