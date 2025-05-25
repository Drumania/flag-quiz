import { useEffect, useRef, useState } from "react";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

interface Flag {
  name: string;
  code: string;
  flag: string;
}

interface FlagModalProps {
  flag: Flag;
  onClose: () => void;
  levelId: string;
}

export default function FlagModal({
  flag,
  onClose,
  levelId,
}: FlagModalProps): JSX.Element {
  const { user } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const options: string[] = ["Argentina", "Germany", "France", "Brazil"];

  function handleClick(option: string) {
    if (selected) return;
    setSelected(option);

    if (option === flag.name) {
      handleCorrectAnswer();
    }
  }

  function handleOutsideClick(e: MouseEvent) {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      closeModal();
    }
  }

  function closeModal() {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  }

  async function handleCorrectAnswer() {
    if (!user) return;
    const db = getFirestore();
    const userDocRef = doc(db, "user_progress", user.uid);
    await updateDoc(userDocRef, {
      [`levels.${levelId}.completed`]: arrayUnion(flag.code),
    });
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div
      className={`position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center 
  modal-backdrop-fade ${closing ? "backdrop-out" : ""}`}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded p-5 text-center position-relative shadow modal-zoom ${
          closing ? "modal-out" : ""
        }`}
        style={{ width: "95%", maxWidth: "600px" }}
      >
        <button
          onClick={closeModal}
          className="btn-close position-absolute top-0 end-0 m-3"
        ></button>

        <img
          src={flag.flag}
          alt="flag"
          className="img-fluid mb-4"
          style={{ maxHeight: "150px", borderRadius: "6px" }}
        />

        <div className="d-grid gap-3">
          {options.map((option, idx) => {
            let className = "btn btn-outline-dark";
            let animationClass = "";

            if (selected) {
              if (option === flag.name) {
                className = "btn btn-success";
                animationClass = "correct-animate";
              } else if (option === selected) {
                className = "btn btn-danger";
                animationClass = "incorrect-animate";
              } else {
                className = "btn btn-outline-secondary";
              }
            }

            return (
              <button
                key={idx}
                className={`${className} ${animationClass}`}
                onClick={() => handleClick(option)}
                disabled={!!selected}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
