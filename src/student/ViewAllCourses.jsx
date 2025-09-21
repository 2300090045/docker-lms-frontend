import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './customer.css'; // Include the custom CSS

export default function ViewAllCourses() {
  const [courses, setCourses] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    id: '',
    name: '',
    credits: '',
    LTPSstructure: '',
    offeredBy: '',
     
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      const response = await fetch(`${config.url}/student/viewallcourses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleBookClick = (courseId) => {
    const student = JSON.parse(sessionStorage.getItem("student"));
    if (!student || !student.id) {
      alert("Student not logged in");
      return;
    }

  };

  const handleSearchChange = (e, field) => {
    setSearchTerms(prev => ({ ...prev, [field]: e.target.value }));
  };

  const filteredEvents = events.filter(course => {
    return (
      course.id.toString().includes(searchTerms.id) &&
      course.name.toLowerCase().includes(searchTerms.toLowerCase()) &&
      course.credits.toLowerCase().includes(searchTerms.company.toLowerCase()) &&
      course.LTPSstructure.toLowerCase().includes(searchTerms.category.toLowerCase()) &&
      course.offeredBy.toLowerCase().includes(searchTerms.title.toLowerCase()) 
    );
  });

  return (
    <div className="course-container">
      <h3 className="course-heading">Available Courses</h3>
      <table className="course-table">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th> Credits</th>
            <th>LTPS Structure</th>
            <th>OfferedBy</th>
          </tr>
          <tr>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'id')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'name')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'credits')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'LTPS Structure')} /></th>
            <th><input type="text" placeholder="Search..." onChange={e => handleSearchChange(e, 'offeredBy')} /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(course => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.course_name}</td>
                <td>{course.credits}</td>
                <td>{course.LTPSstructure}</td>
                <td>{course.offeredBy}</td>
                <td>
                  <button className="add-button" onClick={() => handleBookClick(course.id)}>Add</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No matching courses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}