import { FC } from "react";
import { Figure } from "../models/figures/Figure";
interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map((figure) => (
        <div className="" key={figure.id}>
          {figure.name}{" "}
          {figure.logo && (
            <img
              className="lost-figure__icon"
              src={figure.logo}
              alt={figure.name}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default LostFigures;
