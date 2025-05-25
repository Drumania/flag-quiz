import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Level from "./pages/Level";

export default function App(): JSX.Element {
  const user: null = null; // lo tipamos explícitamente como null por ahora

  return (
    <Router>
      <Header
        user={user}
        onLogin={() => console.log("login")}
        onLogout={() => console.log("logout")}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/level/:levelId" element={<Level />} />
      </Routes>
    </Router>
  );
}
