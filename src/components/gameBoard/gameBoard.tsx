import React, { FunctionComponent } from 'react';
import { GameButton } from '..';
import { GameBoardType } from '../../types';

export interface GameBoardProps {
    gameBoard: GameBoardType;
    onTileClick: (index: number) => void;
    winningMove?: number[];
}

export const GameBoard: FunctionComponent<GameBoardProps> = ({ gameBoard, winningMove, onTileClick }) => {
    return (
        <>
            {Object.values(gameBoard).map((value, index) => (
                <GameButton
                    index={index}
                    isInWinningMove={!!winningMove?.map((move) => move.toString()).includes([index].toString())}
                    key={index}
                    onClick={() => onTileClick(index)}
                    value={value}
                />
            ))}
        </>
    );
};
