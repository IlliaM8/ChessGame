import whiteIcon from "../../assets/white-queen.png";
import blackIcon from "../../assets/black-queen.png";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import { Figure, FigureNames, IFigure } from "./Figure";
export class Queen extends Figure implements IFigure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackIcon : whiteIcon;
    this.name = FigureNames.PAWN;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyVertical(target)) return true;
    if (this.cell.isEmptyHorizontal(target)) return true;
    if (this.cell.isEmptyDiagonal(target)) return true;

    return false;
  }
}
