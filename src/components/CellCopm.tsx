import { FC } from "react";
import { Cell } from "../models/Cell";

interface CellCopmProps {
  cell: Cell;
  selected: boolean;
  click(cell: Cell): void;
}

const CellCopm: FC<CellCopmProps> = ({ cell, selected, click }) => {
  return (
    <div
      onClick={() => {
        console.log(cell.available);
        click(cell);
      }}
      className={[
        "cell",
        cell.color,
        selected ? "selected" : "",
        cell.available && cell.figure ? "cell-available" : "",
      ].join(" ")}
    >
      {cell.available && !cell.figure && <div className={"available"}></div>}
      {cell.figure?.logo && (
        <img src={cell.figure.logo} alt={cell.figure.name} />
      )}
    </div>
  );
};

export default CellCopm;
