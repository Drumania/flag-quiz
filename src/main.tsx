import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "@/contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/global.css";

// Aseguramos que el elemento existe y es del tipo correcto
const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
