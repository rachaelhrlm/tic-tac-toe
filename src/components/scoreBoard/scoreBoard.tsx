import React, { FunctionComponent } from 'react';
import { Button } from '..';

export interface ScoreBoardProps {
    oScore: number;
    tieScore: number;
    xScore: number;
}

export const ScoreBoard: FunctionComponent<ScoreBoardProps> = ({ oScore, tieScore, xScore }) => {
    return (
        <>
            <Button styling="inverse-primary">
                <p>X</p>
                <p className="text-xl">{xScore}</p>
            </Button>
            <Button styling="inverse-tertiary">
                <p>Ties</p>
                <p className="text-xl">{tieScore}</p>
            </Button>
            <Button styling="inverse-secondary">
                <p>O</p>
                <p className="text-xl">{oScore}</p>
            </Button>
        </>
    );
};
