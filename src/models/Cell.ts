import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure, FigureNames } from "./figures/Figure";

interface ICell {
  isEmpty(): boolean;
  isEnemy(target: Cell): boolean;
  isEmptyVertical(target: Cell): boolean;
  isEmptyHorizontal(target: Cell): boolean;
  isEmptyDiagonal(target: Cell): boolean;
  setFigure(figure: Figure): void;
  addLostFigure(figure: Figure): void;
  moveFigure(target: Cell): void;
}

export class Cell implements ICell {
  available: boolean;
  id: number;
  constructor(
    public board: Board,
    readonly x: number,
    readonly y: number,
    readonly color: Colors,
    public figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.board = board;
    this.figure = figure;
    this.id = Math.random();
    this.available = false;
  }
  public isEmpty(): boolean {
    return this.figure === null;
  }
  public isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }
  public isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }
    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCells(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }
  public isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }
    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCells(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }
  public isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absY !== absX) return false;
    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;
    for (let i = 1; i < absY; i++) {
      if (!this.board.getCells(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  public setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }
  public addLostFigure(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.board.lostBlackFigures.push(figure)
      : this.board.lostWhiteFigures.push(figure);
  }
  public moveFigure(target: Cell) {
    if (this.figure && this.figure?.canMove(target)) {
      if (this.figure.name === FigureNames.PAWN) {
        this.figure.isFirstStep = false;
      }
      if (target.figure) {
        this.addLostFigure(target.figure);
      }
      target.setFigure(this.figure);

      this.figure = null;
    }
  }
}
