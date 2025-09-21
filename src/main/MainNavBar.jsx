import { Routes, Route, Link } from 'react-router-dom';
import './style.css';
import AdminLogin from './../admin/AdminLogin';
import StudentLogin from '../student/StudentLogin';
import FacultyLogin from './../faculty/FacultyLogin';
import backgroundImage from './BackGroundImage.jpg';

export default function MainNavBar() {
  return (
    <div className="main-container" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>

      <nav className="navbar">
        <div className="logo">Learning Management System</div>
        <ul className="nav-links">
          <li><Link to="/adminlogin">Admin Login</Link></li>
          <li><Link to="/studentlogin">Student Login</Link></li>
          <li><Link to="/facultylogin">Faculty Login</Link></li>
        </ul>
      </nav>

      <div className="login-wrapper">
        <Routes>
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/facultylogin" element={<FacultyLogin />} />
          <Route path="/studentlogin" element={<StudentLogin />} />
        </Routes>
      </div>
    </div>
  );
}
