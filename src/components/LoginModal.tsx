import { useState, ChangeEvent, FormEvent } from "react";

interface LoginModalProps {
  onClose: () => void;
  onLoginWithGoogle: () => void;
  onEmailLogin: (email: string, password: string) => Promise<void>;
  onEmailRegister: (email: string, password: string) => Promise<void>;
}

export default function LoginModal({
  onClose,
  onLoginWithGoogle,
  onEmailLogin,
  onEmailRegister,
}: LoginModalProps): JSX.Element {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await onEmailLogin(email, password);
      } else {
        await onEmailRegister(email, password);
      }
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error";
      setError(errorMessage);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75">
      <div
        className="bg-white rounded p-4 text-center position-relative"
        style={{ width: "90%", maxWidth: "400px" }}
      >
        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={onClose}
        ></button>
        <h4 className="mb-3">{mode === "login" ? "Login" : "Register"}</h4>

        <form onSubmit={handleSubmit} className="d-grid gap-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {error && <div className="text-danger small">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">
            {mode === "login" ? "Login" : "Register"}
          </button>
          <button
            type="button"
            className="btn btn-outline-dark w-100"
            onClick={onLoginWithGoogle}
          >
            Sign in with Google
          </button>
        </form>

        <div className="mt-3">
          {mode === "login" ? (
            <small>
              Don't have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </small>
          ) : (
            <small>
              Already have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </small>
          )}
        </div>
      </div>
    </div>
  );
}
