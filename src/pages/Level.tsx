import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { dividirEnNiveles } from "@/utils/levels";
import FlagModal from "../components/FlagModal";
import { useAuth } from "../contexts/AuthContext"; // Asegúrate de tener este contexto

export default function LevelPage() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtener el usuario actual
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [completedFlags, setCompletedFlags] = useState([]);

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const db = getFirestore();
        const snapshot = await getDocs(collection(db, "countries"));
        const countries = snapshot.docs.map((doc) => doc.data());

        const niveles = dividirEnNiveles(countries);
        const nivelIndex = parseInt(levelId, 10) - 1;

        if (nivelIndex >= 0 && nivelIndex < niveles.length) {
          setFlags(niveles[nivelIndex]);
        } else {
          console.error("Nivel inválido:", levelId);
        }

        // Obtener progreso del usuario
        if (user) {
          const userDocRef = doc(db, "user_progress", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const completed = userData.levels?.[levelId]?.completed || [];
            setCompletedFlags(completed);
          }
        }
      } catch (error) {
        console.error("Error al obtener los países:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlags();
  }, [levelId, user]);

  if (loading) {
    return <p className="text-center">Cargando banderas...</p>;
  }

  return (
    <main className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          ←
        </h2>
        <h1 className="text-center">Nivel {levelId}</h1>
        <h2>
          {completedFlags.length} / {flags.length}
        </h2>
      </div>
      <div className="flag-grid">
        {flags.map((flag) => {
          const isCompleted = completedFlags.includes(flag.code);
          return (
            <div
              key={flag.code}
              className="flag-card"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedFlag(flag);
                setShowModal(true);
              }}
            >
              <div className="flag-thumb">
                <img
                  src={flag.flag}
                  alt={flag.name}
                  className="img-fluid flag-img"
                  style={{
                    height: "250px",
                    objectFit: "contain",
                    width: "100%",
                  }}
                />
                {isCompleted && <p className="text-center mt-2">{flag.name}</p>}
              </div>
            </div>
          );
        })}
      </div>
      {showModal && selectedFlag && (
        <FlagModal
          flag={selectedFlag}
          onClose={() => {
            setShowModal(false);
            setSelectedFlag(null);
          }}
          levelId={levelId} // Pasamos el nivel actual al modal
        />
      )}
    </main>
  );
}
