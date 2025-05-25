import { useNavigate } from "react-router-dom";
import LevelCard from "../components/LevelCard";

export default function Home(): JSX.Element {
  const navigate = useNavigate();
  const levels: number[] = [1, 2, 3, 4, 5];

  const handleSelectLevel = (lvl: number) => {
    navigate(`/level/${lvl}`);
  };

  return (
    <main className="container my-5">
      <div className="row g-4 justify-content-center">
        {levels.map((lvl) => (
          <LevelCard key={lvl} level={lvl} onClick={handleSelectLevel} />
        ))}
      </div>
    </main>
  );
}
