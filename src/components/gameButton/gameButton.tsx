import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';
import { Button, ButtonProps, ButtonStlye } from '..';

export type GameValue = 0 | 1 | 2;

export interface GameButtonProps extends ButtonProps {
    isInWinningMove?: boolean;
    value: GameValue;
}

export const GameButton: FunctionComponent<GameButtonProps> = ({ isInWinningMove, value, ...props }) => {
    const isXWinner = isInWinningMove && value === 1;
    const isOWinner = isInWinningMove && value === 2;

    let buttonStyling: ButtonStlye = 'primary';
    if (isXWinner) {
        buttonStyling = 'inverse-primary';
    } else if (isOWinner) {
        buttonStyling = 'inverse-secondary';
    } else if (value === 2) {
        buttonStyling = 'secondary';
    }

    return (
        <Button {...props} extraClasses="h-32 w-32" styling={buttonStyling}>
            {value === 1 ? (
                <BiX className={classNames('text-cyan-500', { ' text-black-500': isInWinningMove })} size={100} strokeWidth={2} />
            ) : value === 2 ? (
                <BiRadioCircle className={classNames('text-pink-500', { ' text-black-500': isInWinningMove })} size={100} strokeWidth={2} />
            ) : (
                ''
            )}
        </Button>
    );
};
