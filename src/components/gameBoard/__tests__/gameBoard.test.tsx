import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameBoard } from '..';
import { GameBoardType } from '../../../types';

describe('<GameBoard />', () => {
    const emptyBoard: GameBoardType = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
    const mockOnClick = jest.fn();

    describe('gameBoard', () => {
        const cases: GameBoardType[] = [
            emptyBoard,
            { 0: 1, 1: 0, 2: 0, 3: 2, 4: 1, 5: 1, 6: 0, 7: 0, 8: 2 },
            { 0: 2, 1: 1, 2: 0, 3: 2, 4: 1, 5: 1, 6: 2, 7: 2, 8: 1 },
        ];

        test.each(cases)('should plot the values passed through the (gameBoard) correctly', (gameBoard) => {
            render(<GameBoard gameBoard={gameBoard} onTileClick={mockOnClick} />);

            const allTiles = Object.entries(gameBoard);
            const emptyTiles = allTiles.filter(([index, value]) => value === 0);
            const xTiles = allTiles.filter(([index, value]) => value === 1);
            const oTiles = allTiles.filter(([index, value]) => value === 2);

            emptyTiles.forEach(([index, value]) => {
                expect(screen.queryByTestId(`${index}-${value}`)).not.toBeInTheDocument();
            });

            xTiles.forEach(([index, value]) => {
                expect(screen.getByTestId(`${index}-${value}`)).toHaveClass('text-cyan-500');
                expect(screen.getByTestId(`${index}-${value}`)).not.toHaveClass('text-yellow-500');
            });

            oTiles.forEach(([index, value]) => {
                expect(screen.getByTestId(`${index}-${value}`)).not.toHaveClass('text-cyan-500');
                expect(screen.getByTestId(`${index}-${value}`)).toHaveClass('text-yellow-500');
            });
        });
    });

    describe('onTileClick', () => {
        const cases: number[] = [0, 3, 5, 7, 8];

        test.each(cases)('should call (onClick) with tile number (%s) when clicked', (tileNumber) => {
            render(<GameBoard gameBoard={emptyBoard} onTileClick={mockOnClick} />);

            userEvent.click(screen.getByTestId(`tile-${tileNumber}`));

            expect(mockOnClick).toHaveBeenCalledWith(tileNumber);
        });
    });

    describe('winningMove', () => {
        const cases: [GameBoardType, number[], string][] = [
            [{ 0: 1, 1: 1, 2: 1, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }, [0, 1, 2], 'text-cyan-500'],
            [{ 0: 2, 1: 1, 2: 2, 3: 2, 4: 1, 5: 2, 6: 2, 7: 2, 8: 2 }, [2, 5, 8], 'text-yellow-500'],
        ];

        test.each(cases)(
            'should highight the values passed through the (gameBoard) that match the tiles passed in (winningMove)',
            (gameBoard, winningMove, classes) => {
                render(<GameBoard gameBoard={gameBoard} onTileClick={mockOnClick} winningMove={winningMove} />);

                const allTiles = Object.entries(gameBoard);
                const xTiles = allTiles.filter(([index, value]) => value === 1);
                const oTiles = allTiles.filter(([index, value]) => value === 2);

                xTiles
                    .filter(([index, value]) => winningMove.includes(Number(index)))
                    .forEach(([index, value]) => {
                        expect(screen.getByTestId(`tile-${index}`)).toHaveClass('bg-cyan-500');
                        expect(screen.getByTestId(`tile-${index}`)).not.toHaveClass('bg-yellow-500');
                    });

                oTiles
                    .filter(([index, value]) => winningMove.includes(Number(index)))
                    .forEach(([index, value]) => {
                        expect(screen.getByTestId(`tile-${index}`)).not.toHaveClass('bg-cyan-500');
                        expect(screen.getByTestId(`tile-${index}`)).toHaveClass('bg-yellow-500');
                    });
            },
        );
    });
});
