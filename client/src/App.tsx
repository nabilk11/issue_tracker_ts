import Body from "./components/Body";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Issues from "./pages/Issues";
import Projects from "./pages/Projects";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Body>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Body>
    </AuthProvider>
  );
};

export default App;
