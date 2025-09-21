import { Routes, Route, Link } from 'react-router-dom';
import './faculty.css';
import FacultyHome from './FacultyHome';
import FacultyLogin from './FacultyLogin';
import { useAuth } from '../context/AuthContext';

export default function FacultyNavBar() {
  const { setIsFacultyLoggedIn } = useAuth();

  const handleLogout = () => {
    setIsFacultyLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Faculty</div>
        <ul className="nav-links">
          <li><Link to="/facultyhome">Home</Link></li>
          <li><Link to="/facultylogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/facultylogin" element={<FacultyLogin />} />
        <Route path="/facultyhome" element={<FacultyHome />} />
      </Routes>
    </div>
  );
}
