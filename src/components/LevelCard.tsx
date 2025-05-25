export default function LevelCard({ level, onClick }) {
  const stars = "⭐".repeat(level);

  return (
    <div
      className="level-card"
      onClick={() => onClick(level)}
      style={{
        minHeight: "150px",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h4 className="mb-2">Level {level}</h4>
      <div style={{ fontSize: "1.25rem", color: "#ffc107" }}>{stars}</div>
    </div>
  );
}
