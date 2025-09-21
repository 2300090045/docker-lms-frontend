import { BrowserRouter } from "react-router-dom";
import MainNavBar from "./main/MainNavBar";
import AdminNavBar from "./admin/AdminNavBar";
import FacultyNavBar from "./faculty/FacultyNavBar";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const { isAdminLoggedIn } = useAuth();  // Accessing admin login status
  const { isFacultyLoggedIn } = useAuth();  // Accessing faculty login status

  return (
    <div>
      {isAdminLoggedIn ? (
        <AdminNavBar />  // Show AdminNavBar if admin is logged in
      ) : isFacultyLoggedIn ? (
        <FacultyNavBar />  // Show FacultyNavBar if faculty is logged in
      ) : (
        <MainNavBar />  // Default to MainNavBar if neither is logged in
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>  {/* Providing auth context to the entire app */}
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;