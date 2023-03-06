import whiteIcon from "../../assets/white-king.png";
import blackIcon from "../../assets/black-king.png";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import { Figure, FigureNames } from "./Figure";
export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackIcon : whiteIcon;
    this.name = FigureNames.KING;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    return true;
  }
}
