import React, { FC, useState, useEffect } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellCopm from "./CellCopm";

interface BoardCompProps {
  board: Board;
  setBoard(Board: Board): void;
  currentPlayer: Player | null;
  swapPlayer(): void;
}

const BoardComp: FC<BoardCompProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selectedCell, setCelectedCell] = useState<Cell | null>(null);
  function click(cell: Cell): void {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setCelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setCelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }
  return (
    <div className="board">
      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell, index) => (
            <CellCopm
              cell={cell}
              key={index}
              click={click}
              selected={
                cell?.x === selectedCell?.x && cell?.y === selectedCell?.y
              }
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BoardComp;
