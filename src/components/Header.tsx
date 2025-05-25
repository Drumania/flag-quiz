import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";

export default function Header(): JSX.Element {
  const { user, loginWithGoogle, logout, loginWithEmail, registerWithEmail } = useAuth();
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    setShowLogin(false);
  };

  return (
    <div className="container">
      <header className="d-flex justify-content-between align-items-center py-4">
        <h1 className="m-0 fs-3">Flag Quiz</h1>

        {user ? (
          <div className="d-flex align-items-center gap-2">
            <img
              src={user.photoURL || "/avatar.png"}
              alt="avatar"
              className="rounded-circle"
              style={{ width: "32px", height: "32px", objectFit: "cover" }}
            />
            <span>{user.displayName || user.email}</span>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="btn btn-dark btn-sm"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        )}

        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onLoginWithGoogle={handleGoogleLogin}
            onEmailLogin={loginWithEmail}
            onEmailRegister={registerWithEmail}
          />
        )}
      </header>
    </div>
  );
}
