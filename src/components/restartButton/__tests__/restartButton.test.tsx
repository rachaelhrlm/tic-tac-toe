import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RestartButton } from '..';

describe('<RestartButton />', () => {
    const mockOnClick = jest.fn();
    describe('isDisabled', () => {
        it('should be disabled if (isDisabled) is true', () => {
            render(<RestartButton isDisabled={true} onClick={mockOnClick} />);

            expect(screen.getByRole('button')).toBeDisabled();
        });

        it('should not be disabled if (isDisabled) is false', () => {
            render(<RestartButton isDisabled={false} onClick={mockOnClick} />);

            expect(screen.getByRole('button')).not.toBeDisabled();
        });
    });

    describe('onClick', () => {
        it('should call (onClick) when clicked', () => {
            render(<RestartButton isDisabled={false} onClick={mockOnClick} />);

            userEvent.click(screen.getByRole('button'));

            expect(mockOnClick).toHaveBeenCalledTimes(1);
        });
    });
});
