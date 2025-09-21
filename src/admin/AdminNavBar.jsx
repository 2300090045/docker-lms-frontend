import { Routes, Route, Link } from 'react-router-dom';
import './admin.css';
import AdminHome from './AdminHome';
import AdminLogin from './AdminLogin';
import AddCourses from './AddCourses';
import DeleteFaculty from './DeleteFaculty';
import DeleteStudents from './DeleteStudents';
import ViewAllFaculty from './ViewAllFaculty';
import ViewAllStudents from './ViewAllStudents';
import { useAuth } from '../context/AuthContext';
export default function AdminNavBar() 
{
  const { setIsAdminLoggedIn } = useAuth(); 

  const handleLogout = () => 
  {
    setIsAdminLoggedIn(false); 
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Admin</div>
        <ul className="nav-links">
          <li><Link to="/adminhome">Home</Link></li>
          <li><Link to="/addcourses">AddCourses</Link></li>


          <li className="dropdown">
            <span>Delete▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/deletefaculty">DeleteFaculty</Link></li>
              <li><Link to="/deletestudents">DeleteStudents</Link></li>
            </ul>
          </li>



          <li className="dropdown">
            <span>ViewAll▾</span>
            <ul className="dropdown-menu">
              <li><Link to="/viewallfaculty">ViewAllFaculty</Link></li>
              <li><Link to="/viewallstudents">ViewAllStudents</Link></li>
            </ul>
          </li>




          <li><Link to="/adminlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} exact />
        <Route path="/addcourses" element={<AddCourses />} exact/>

        <Route path="/deletefaculty" element={<DeleteFaculty/>} exact />
        <Route path="/deletestudents" element={<DeleteStudents/>} exact />

        <Route path="/viewallfaculty" element={<ViewAllFaculty/>} exact />
        <Route path="/viewallstudents" element={<ViewAllStudents/>} exact />

        <Route path="/adminlogin" element={<AdminLogin />} exact />
      </Routes>
    </div>
  );
}