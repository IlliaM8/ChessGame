import whiteIcon from "../../assets/white-king.png";
import blackIcon from "../../assets/black-king.png";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import { Figure, FigureNames, IFigure } from "./Figure";

export class King extends Figure implements IFigure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackIcon : whiteIcon;
    this.name = FigureNames.KING;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    const isVerticalMove =
      (target.y === this.cell.y + 1 || target.y === this.cell.y - 1) &&
      target.x === this.cell.x;
    const isHorizontal =
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      target.y === this.cell.y;

    const isDiagonal = dx === 1 && dy === 1;
    return isVerticalMove || isHorizontal || isDiagonal;
  }
}
