import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure } from "./figures/Figure";
import { King } from "./figures/KIng";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Quein";
import { Rook } from "./figures/Rook";
interface IBoard {
  initCells(): void;
  highlightCells(selectedCell: Cell | null): void;
  getCopyBoard(selectedCell: Board): Board;
  getCells(x: number, y: number): Cell;
}
export class Board implements IBoard {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];
  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null));
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null));
        }
      }
      this.cells.push(row);
    }
  }
  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }

  public getCells(x: number, y: number) {
    return this.cells[y][x];
  }
  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCells(i, 1));
    }
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, this.getCells(i, 6));
    }
  }
  private addKings() {
    new King(Colors.BLACK, this.getCells(4, 0));
    new King(Colors.WHITE, this.getCells(4, 7));
  }
  private addQueens() {
    new Queen(Colors.BLACK, this.getCells(3, 0));
    new Queen(Colors.WHITE, this.getCells(3, 7));
  }
  private addBishops() {
    new Bishop(Colors.BLACK, this.getCells(2, 0));
    new Bishop(Colors.BLACK, this.getCells(5, 0));
    new Bishop(Colors.WHITE, this.getCells(2, 7));
    new Bishop(Colors.WHITE, this.getCells(5, 7));
  }
  private addRooks() {
    new Rook(Colors.BLACK, this.getCells(0, 0));
    new Rook(Colors.BLACK, this.getCells(7, 0));
    new Rook(Colors.WHITE, this.getCells(0, 7));
    new Rook(Colors.WHITE, this.getCells(7, 7));
  }
  private addKnights() {
    new Knight(Colors.BLACK, this.getCells(1, 0));
    new Knight(Colors.BLACK, this.getCells(6, 0));
    new Knight(Colors.WHITE, this.getCells(1, 7));
    new Knight(Colors.WHITE, this.getCells(6, 7));
  }

  public addFigures() {
    this.addPawns();
    this.addKings();
    this.addQueens();
    this.addBishops();
    this.addRooks();
    this.addKnights();
  }
}
