import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { BiX, BiRadioCircle } from 'react-icons/bi';
import { Button, ButtonProps, ButtonStlye } from '..';

export interface GameButtonProps extends ButtonProps {
    isInWinningMove?: boolean;
    value: number;
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
        <span className="w-full pt-[100%] relative flex place-items-center">
            <Button
                {...props}
                extraClasses="h-full w-full text-6xl absolute top-0 left-0 bottom-0 right-0 md:text-7xl 2xl:text-9xl"
                styling={buttonStyling}>
                {value === 1 ? (
                    <BiX className={classNames('text-cyan-500', { ' text-black-500': isInWinningMove })} strokeWidth={2} />
                ) : value === 2 ? (
                    <BiRadioCircle className={classNames('text-pink-500', { ' text-black-500': isInWinningMove })} strokeWidth={2} />
                ) : (
                    ''
                )}
            </Button>
        </span>
    );
};
