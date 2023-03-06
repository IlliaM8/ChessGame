import { Cell } from "../Cell";
import { Colors } from "../Colors";
import icon from "../../assets/black-king.png";

export interface IFigure {
  canMove: (target: Cell) => boolean;
}

export enum FigureNames {
  FIGURE = "FIGURE",
  KING = "Король",
  QUEEN = "Ферзь",
  ROOK = "Ладья",
  BISHOP = "Слон",
  KNIGHT = "Конь",
  PAWN = "Пешка",
}

export class Figure implements IFigure {
  logo: typeof icon | null;
  name: FigureNames;
  isFirstStep: boolean = true;

  id: number;

  constructor(public color: Colors, public cell: Cell) {
    this.color = color;
    this.cell = cell;

    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }
  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }
    if (target.figure?.name === FigureNames.KING) {
      return false;
    }
    return true;
  }
}
