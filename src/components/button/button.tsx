import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

export type ButtonStlye = 'primary' | 'secondary' | 'tertiary' | 'inverse-primary' | 'inverse-secondary' | 'inverse-tertiary';

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    extraClasses?: string;
    styling?: ButtonStlye;
}

export const Button: FunctionComponent<ButtonProps> = ({ children, disabled, extraClasses, onClick, styling = 'primary', ...props }) => {
    return (
        <button
            {...props}
            disabled={disabled}
            onClick={!disabled ? onClick : undefined}
            className={classNames(
                'grid place-items-center rounded-xl font-bold uppercase p-2',
                { 'cursor-not-allowed': disabled },
                { 'cursor-pointer hover:scale-110 transition-all': !!onClick },
                { 'cursor-default': !onClick },
                { 'bg-black-500 shadow-solid-black text-cyan-500': styling === 'primary' },
                { 'bg-black-500 shadow-solid-black text-yellow-500': styling === 'secondary' },
                { 'bg-black-500 shadow-solid-black text-gray-400': styling === 'tertiary' },
                { 'bg-cyan-500 shadow-solid-cyan text-black-500': styling === 'inverse-primary' },
                { 'bg-yellow-500 shadow-solid-yellow text-black-500': styling === 'inverse-secondary' },
                { 'bg-gray-400 shadow-solid-gray text-black-500': styling === 'inverse-tertiary' },
                extraClasses,
            )}>
            {children}
        </button>
    );
};
