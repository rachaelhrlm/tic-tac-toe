import classNames from 'classnames';
import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';

export type ButtonStlye = 'primary' | 'secondary' | 'tertiary' | 'inverse-primary' | 'inverse-secondary' | 'inverse-tertiary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    extraClasses?: string;
    styling?: ButtonStlye;
}

export const Button: FunctionComponent<ButtonProps> = ({ children, extraClasses, onClick, styling = 'primary', ...props }) => {
    return (
        <button
            {...props}
            onClick={onClick}
            className={classNames(
                'grid place-items-center rounded-xl font-bold text-sm uppercase p-1',
                { 'cursor-pointer hover:scale-110 transition-all': !!onClick },
                { 'cursor-default': !onClick },
                { 'bg-black-500 shadow-solid-black text-cyan-500': styling === 'primary' },
                { 'bg-black-500 shadow-solid-black text-pink-500': styling === 'secondary' },
                { 'bg-black-500 shadow-solid-black text-gray-400': styling === 'tertiary' },
                { 'bg-cyan-500 shadow-solid-cyan text-black-500': styling === 'inverse-primary' },
                { 'bg-pink-500 shadow-solid-pink text-black-500': styling === 'inverse-secondary' },
                { 'bg-gray-400 shadow-solid-gray text-black-500': styling === 'inverse-tertiary' },
                extraClasses,
            )}>
            {children}
        </button>
    );
};
