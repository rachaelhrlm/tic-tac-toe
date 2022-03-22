import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '..';

describe('<Button />', () => {
    const buttonText = 'Meow';
    const mockOnClick = jest.fn();

    describe('disabled', () => {
        it('should be disabled when (true)', () => {
            render(<Button disabled={true}>{buttonText}</Button>);

            expect(screen.getByText(buttonText)).toBeDisabled();
        });

        it('should not be disabled when (false)', () => {
            render(<Button disabled={false}>{buttonText}</Button>);

            expect(screen.getByText(buttonText)).not.toBeDisabled();
        });

        it('should render with disabled classes when (true)', () => {
            render(<Button disabled={true}>{buttonText}</Button>);

            expect(screen.getByText(buttonText)).toHaveClass('cursor-not-allowed');
        });

        it('should not render with disabled classes when (false)', () => {
            render(<Button disabled={false}>{buttonText}</Button>);

            expect(screen.getByText(buttonText)).not.toHaveClass('cursor-not-allowed');
        });

        it('should not call (onClick) on click even when passed if disabled is (true)', () => {
            render(
                <Button disabled={true} onClick={mockOnClick}>
                    {buttonText}
                </Button>,
            );

            userEvent.click(screen.getByText(buttonText));

            expect(mockOnClick).not.toHaveBeenCalled();
        });
    });

    describe('onClick', () => {
        it('should call (onClick) when clicked', () => {
            render(<Button onClick={mockOnClick}>{buttonText}</Button>);

            userEvent.click(screen.getByText(buttonText));

            expect(mockOnClick).toHaveBeenCalled();
        });
    });

    describe('styling', () => {
        it('should render with (primary) styling when (primary) is passed', () => {
            render(<Button styling="primary">{buttonText}</Button>);

            expect(screen.getByText(buttonText)).toHaveClass('bg-black-500 shadow-solid-black text-cyan-500');
        });

        it('should render with (secondary) styling when (secondary) is passed', () => {
            render(<Button styling="secondary">{buttonText}</Button>);

            expect(screen.getByText(buttonText)).toHaveClass('bg-black-500 shadow-solid-black text-yellow-500');
        });

        it('should render with (tertiary) styling when (tertiary) is passed', () => {
            render(<Button styling="tertiary">{buttonText}</Button>);

            expect(screen.getByText(buttonText)).toHaveClass('bg-black-500 shadow-solid-black text-gray-400');
        });

        it('should render with (inverse-primary) styling when (inverse-primary) is passed', () => {
            render(<Button styling="inverse-primary">{buttonText}</Button>);

            expect(screen.getByText(buttonText)).toHaveClass('bg-cyan-500 shadow-solid-cyan text-black-500');
        });

        it('should render with (inverse-secondary) styling when (inverse-secondary) is passed', () => {
            render(<Button styling="inverse-secondary">{buttonText}</Button>);

            expect(screen.getByText(buttonText)).toHaveClass('bg-yellow-500 shadow-solid-yellow text-black-500');
        });

        it('should render with (inverse-tertiary) styling when (inverse-tertiary) is passed', () => {
            render(<Button styling="inverse-tertiary">{buttonText}</Button>);

            expect(screen.getByText(buttonText)).toHaveClass('bg-gray-400 shadow-solid-gray text-black-500');
        });
    });
});
