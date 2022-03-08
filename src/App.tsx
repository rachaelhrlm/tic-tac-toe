import React, { useState } from "react";
import { BiX, BiRefresh, BiRadioCircle } from "react-icons/bi";

const App = () => {
  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [winner, setWinner] = useState<string>();

  const userMove = (indexX: number, indexY: number) => {
    const newBoard = [...board];
    if (newBoard[indexX][indexY] === 0) {
      newBoard[indexX][indexY] = 1;
      setBoard(newBoard);
      checkBoard();
      computerMove();
    }
  };

  const computerMove = () => {
    const indexX = Math.floor(Math.random() * 3);
    const indexY = Math.floor(Math.random() * 3);
    const newBoard = [...board];
    if (newBoard[indexX][indexY] === 0) {
      newBoard[indexX][indexY] = 2;
    } else if (newBoard.some((row) => row.some((col) => col === 0))) {
      computerMove();
    } else setWinner("It's a tie!");
    setBoard(newBoard);
    checkBoard();
  };

  const checkVertical = () => {
    let winner: number | undefined;

    board.forEach((row, indexX) => {
      let count = { 1: 0, 2: 0 };
      row.forEach((col, indexY) => {
        if (board[indexX][indexY] === 1) count[1] += 1;
        if (board[indexX][indexY] === 2) count[2] += 1;
      });
      if (count[1] === 3) winner = 1;
      if (count[2] === 3) winner = 2;
    });
    return winner;
  };

  const checkHorizontal = () => {
    let winner: number | undefined;

    board.forEach((row, indexX) => {
      let count = { 1: 0, 2: 0 };
      row.forEach((col, indexY) => {
        if (board[indexY][indexX] === 1) count[1] += 1;
        if (board[indexY][indexX] === 2) count[2] += 1;
      });
      if (count[1] === 3) winner = 1;
      if (count[2] === 3) winner = 2;
    });
    return winner;
  };

  const checkDiagonal = () => {
    let winner: number | undefined;

    const winningMoves = [
      [board[0][0], board[1][1], board[2][2]],
      [board[2][0], board[1][1], board[0][2]],
    ];

    winningMoves.forEach((move) => {
      if (move.every((num) => num === 1)) winner = 1;
      if (move.every((num) => num === 2)) winner = 2;
    });
    return winner;
  };

  const checkBoard = () => {
    let winner: number | undefined;
    winner = checkHorizontal();
    if (!winner) winner = checkVertical();
    if (!winner) winner = checkDiagonal();
    if (winner === 1) setWinner("You win!");
    if (winner === 2) setWinner("Computer wins!");
  };

  const clearBoard = () => {
    const newBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    setWinner(undefined);
    setBoard(newBoard);
  };

  return (
    <div className="bg-black-600 h-screen w-screen">
      <div className="w-full h-full grid place-items-center">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex">
            <BiX className="text-cyan-500" viewBox="0 0 20 20" size={40} strokeWidth={2} /> <BiRadioCircle viewBox="0 0 20 20" className="text-pink-500" size={40} strokeWidth={2} />
          </div>
          <div className="flex gap-1 justify-center place-items-center bg-black-500 shadow-solid-black rounded-xl w-32 uppercase text-gray-300 text-sm font-semibold">
            <BiX size={30} strokeWidth={2} /> Turn
          </div>
          <button className="flex justify-end" onClick={() => clearBoard()}>
            <BiRefresh className="cursor-pointer bg-gray-400 rounded-lg shadow-solid-gray text-black-500" size={40} />
          </button>
          {board.map((row, indexX) => {
            return row.map((col, indexY) => (
              <div
                onClick={() => {
                  if (!winner) userMove(indexX, indexY);
                }}
                className="grid place-items-center bg-black-500 shadow-solid-black rounded-xl h-32 w-32 cursor-pointer text-white"
              >
                {col === 1 ? <BiX key={`${indexX}-${indexY}`} className="text-cyan-500" size={100} strokeWidth={2} /> : col === 2 ? <BiRadioCircle className="text-pink-500" size={100} strokeWidth={2} /> : ""}
              </div>
            ));
          })}
        </div>
      </div>
      {winner}
    </div>
  );
};

export default App;
