import React, { FunctionComponent } from 'react';
import { MdOutlineRefresh } from 'react-icons/md';
import { Button } from '..';

interface RestartButtonProps {
    isDisabled?: boolean;
    onClick?: () => void;
}

export const RestartButton: FunctionComponent<RestartButtonProps> = ({ isDisabled, onClick }) => {
    return (
        <Button aria-label="Restart round" disabled={isDisabled} extraClasses="sm:w-1/2" onClick={onClick} styling="inverse-tertiary">
            <MdOutlineRefresh />
        </Button>
    );
};
