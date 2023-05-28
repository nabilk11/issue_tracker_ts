import Body from "./components/Body";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Body>
        <h1>Issue Tracker</h1>
      </Body>
    </AuthProvider>
  );
}

export default App;
