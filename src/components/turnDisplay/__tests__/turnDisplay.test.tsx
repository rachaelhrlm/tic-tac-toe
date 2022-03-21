import { render, screen } from '@testing-library/react';
import { TurnDisplay } from '..';

describe('<TurnDisplay />', () => {
    describe('turn', () => {
        it('should render an (X) icon if turn is (1)', () => {
            render(<TurnDisplay turn={1} />);

            expect(screen.getByTestId('x-mark')).toBeInTheDocument();
        });

        it('should render an (O) icon if turn is (2)', () => {
            render(<TurnDisplay turn={2} />);

            expect(screen.getByTestId('o-mark')).toBeInTheDocument();
        });
    });
});
