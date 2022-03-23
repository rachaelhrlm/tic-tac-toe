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
        <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6">
            {Object.values(gameBoard).map((value, index) => (
                <GameButton
                    index={index}
                    isInWinningMove={!!winningMove?.map((move) => `${move}`).includes(`${index}`)}
                    key={index}
                    onClick={() => onTileClick(index)}
                    value={value}
                />
            ))}
        </div>
    );
};
