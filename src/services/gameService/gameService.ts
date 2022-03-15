import { GameBoardType } from '../../types';

const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const getWinningMove = (gameBoard: GameBoardType): number[] | undefined => {
    let winningMove;
    GameService.winningMoves.forEach((move) => {
        if (move.every((tile, index, array) => gameBoard[tile] !== 0 && gameBoard[tile] === gameBoard[array[0]])) winningMove = move;
    });
    return winningMove;
};

const setMark = (gameBoard: GameBoardType, tile: number, playerMark: number): GameBoardType => {
    const newGameBoard = { ...gameBoard, [tile]: playerMark };
    return newGameBoard;
};

export const GameService = {
    getWinningMove,
    setMark,
    winningMoves,
};
