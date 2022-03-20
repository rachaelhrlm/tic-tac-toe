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
            <Button styling="inverse-primary" tabIndex={-1}>
                <p>X</p>
                <p className="text-xl">{xScore}</p>
            </Button>
            <Button styling="inverse-tertiary" tabIndex={-1}>
                <p>Ties</p>
                <p className="text-xl" tabIndex={-1}>
                    {tieScore}
                </p>
            </Button>
            <Button styling="inverse-secondary" tabIndex={-1}>
                <p>O</p>
                <p className="text-xl">{oScore}</p>
            </Button>
        </>
    );
};
