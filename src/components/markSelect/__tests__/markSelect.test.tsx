import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MarkSelect } from '..';

describe('<MarkSelect />', () => {
    const mockOnClick = jest.fn();

    describe('onClick', () => {
        it('should call (onClick) with (1) when (X button) is clicked', () => {
            render(<MarkSelect onClick={mockOnClick} value={1} />);

            userEvent.click(screen.getByTestId('x-button'));

            expect(mockOnClick).toHaveBeenCalledWith(1);
        });

        it('should call (onClick) with (2) when (O button) is clicked', () => {
            render(<MarkSelect onClick={mockOnClick} value={1} />);

            userEvent.click(screen.getByTestId('o-button'));

            expect(mockOnClick).toHaveBeenCalledWith(2);
        });
    });

    describe('value', () => {
        it('should render (X) as selected and not (O) when the value passed is (1)', () => {
            render(<MarkSelect onClick={mockOnClick} value={1} />);

            expect(screen.getByTestId('x-button')).toHaveClass('bg-gray-400 text-black-600');
            expect(screen.getByTestId('x-button')).not.toHaveClass('text-gray-400 hover:text-black-600');
            expect(screen.getByTestId('o-button')).toHaveClass('text-gray-400 hover:text-black-600');
            expect(screen.getByTestId('o-button')).not.toHaveClass('bg-gray-400 text-black-600');
        });

        it('should render (O) as selected and not (X) when the value passed is (2)', () => {
            render(<MarkSelect onClick={mockOnClick} value={2} />);

            expect(screen.getByTestId('x-button')).not.toHaveClass('bg-gray-400 text-black-600');
            expect(screen.getByTestId('x-button')).toHaveClass('text-gray-400 hover:text-black-600');
            expect(screen.getByTestId('o-button')).not.toHaveClass('text-gray-400 hover:text-black-600');
            expect(screen.getByTestId('o-button')).toHaveClass('bg-gray-400 text-black-600');
        });
    });
});
