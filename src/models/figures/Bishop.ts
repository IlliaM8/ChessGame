import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames, IFigure } from "./Figure";
import whiteIcon from "../../assets/white-bishop.png";
import blackIcon from "../../assets/black-bishop.png";
export class Bishop extends Figure implements IFigure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackIcon : whiteIcon;
    this.name = FigureNames.BISHOP;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (this.cell.isEmptyDiagonal(target)) return true;
    return false;
  }
}
