import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import AlertContainer from "./components/Alert/AlertContainer";

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <AppRoutes />
        <AlertContainer />
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;