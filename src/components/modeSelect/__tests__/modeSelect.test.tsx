import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModeSelect } from '..';
import { GameMode } from '../..';

describe('<ModeSelect />', () => {
    const mockOnClick = jest.fn();
    describe('onClick', () => {
        it('should call (onClick) with (GameMode.SOLO) when (Solo button) is clicked', () => {
            render(<ModeSelect onClick={mockOnClick} />);

            userEvent.click(screen.getByText('Solo'));

            expect(mockOnClick).toHaveBeenCalledWith(GameMode.SOLO);
        });

        it('should call (onClick) with (GameMode.CPU_EASY) when (CPU Easy Mode button) is clicked', () => {
            render(<ModeSelect onClick={mockOnClick} />);

            userEvent.click(screen.getByText('Easy Mode', { exact: false }));

            expect(mockOnClick).toHaveBeenCalledWith(GameMode.CPU_EASY);
        });

        it('should call (onClick) with (GameMode.CPU_HARD) when (CPU Hard Mode button) is clicked', () => {
            render(<ModeSelect onClick={mockOnClick} />);

            userEvent.click(screen.getByText('Hard Mode', { exact: false }));

            expect(mockOnClick).toHaveBeenCalledWith(GameMode.CPU_HARD);
        });
    });
});
