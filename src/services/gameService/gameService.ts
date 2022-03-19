import { GameBoardType, Move } from '../../types';

const cornerAndCenterTiles = [4, 0, 2, 8, 6];
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

const generateRandomNumber = (number: number) => {
    return Math.floor(Math.random() * number);
};

const getMovesToBlock = (board: GameBoardType, playerMark: number): number | undefined => {
    let movesToBlock: Move[] = [];
    let tilesToMark: number[] = [];

    GameService.winningMoves.forEach((move) => {
        if (move.filter((tile) => board[tile] === playerMark).length > 1) movesToBlock.push(move);
    });

    if (movesToBlock.length && movesToBlock.some((move) => move.some((tile) => board[tile] === 0))) {
        movesToBlock.forEach((move) => {
            if (move.some((tile) => board[tile] === 0))
                move.forEach((tile) => {
                    if (board[tile] === 0) tilesToMark.push(tile);
                });
        });
    }

    return tilesToMark[generateRandomNumber(tilesToMark.length)];
};

const getMovesToWin = (board: GameBoardType, computerMark: number) => {
    let movesToWin: Move[] = [];
    let tilesToMark: number[] = [];

    GameService.winningMoves.forEach((move) => {
        if (move.filter((tile) => board[tile] === computerMark).length > 1) movesToWin.push(move);
    });

    if (movesToWin.length && movesToWin.some((move) => move.some((tile) => board[tile] === 0))) {
        movesToWin.forEach((move) => {
            if (move.some((tile) => board[tile] === 0))
                move.forEach((tile) => {
                    if (board[tile] === 0) tilesToMark.push(tile);
                });
        });
    }

    return tilesToMark[generateRandomNumber(tilesToMark.length)];
};

const getSmartRandomMove = (board: GameBoardType, computerMark: number) => {
    const playerMark = computerMark === 1 ? 2 : 1;

    let possibleMoves: Move[] = [];
    let possibleTiles: number[] = [];
    let possibleCornerMoves: number[] = [];

    GameService.winningMoves.forEach((move) => {
        if (move.filter((tile) => board[tile] === computerMark && move.every((tile) => board[tile] !== playerMark)).length >= 1)
            possibleMoves.push(move);
    });

    possibleMoves.forEach((move) => {
        if (move.some((tile) => board[tile] === 0))
            move.forEach((tile) => {
                if (board[tile] === 0 && cornerAndCenterTiles.includes(tile)) possibleCornerMoves.push(tile);
                if (board[tile] === 0) possibleTiles.push(tile);
            });
    });

    if (possibleCornerMoves.length) return possibleCornerMoves[Math.floor(Math.random() * possibleCornerMoves.length)];
    if (possibleTiles.length) return possibleTiles[Math.floor(Math.random() * possibleTiles.length)];

    const alternatePreferredMoves = cornerAndCenterTiles.filter((tile) => board[tile] === 0);
    if (alternatePreferredMoves.length) return alternatePreferredMoves[Math.floor(Math.random() * alternatePreferredMoves.length)];

    return getRandomMove(board);
};

const getRandomMove = (board: GameBoardType) => {
    if (Object.values(board).some((tile) => tile === 0)) {
        const emptyTiles: number[] = Object.entries(board)
            .filter(([key, value]) => value === 0)
            .map(([key]) => Number(key));
        const numberOfTiles: number = emptyTiles.length;

        let tile = generateRandomNumber(numberOfTiles);

        if (emptyTiles) return emptyTiles[tile];
    }
    return undefined;
};

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
    getMovesToBlock,
    getMovesToWin,
    getRandomMove,
    getSmartRandomMove,
    getWinningMove,
    setMark,
    winningMoves,
};
