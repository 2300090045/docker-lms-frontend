import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function AddCourses() {
  const [formData, setFormData] = useState({
    courseName: '',
    credits: '',
    ltpsStructure: '',
    offeredBy: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: id === 'credits' ? parseInt(value) || '' : value
    });
  };

  const handleCase = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.toUpperCase() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.url}/admin/addcourse`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          courseName: '',
          credits: '',
          ltpsStructure: '',
          offeredBy: ''
        });
      }
    } catch (error) {
      setMessage('');
      if (error.response && typeof error.response.data === 'string') {
        setError(error.response.data);
      } else if (error.response && typeof error.response.data === 'object') {
        setError(error.response.data.message || 'An error occurred while adding the course.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="form-container">
      <h3 className="form-heading">Add Course</h3>
      {message && <p className="message-success">{message}</p>}
      {error && <p className="message-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseName">ADD COURSE NAME</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            onKeyUp={handleCase}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="credits">CREDITS</label>
          <input
            type="number"
            id="credits"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ltpsStructure">LTPS STRUCTURE</label>
          <input
            type="text"
            id="ltpsStructure"
            name="ltpsStructure"
            value={formData.ltpsStructure}
            onChange={handleChange}
            onKeyUp={handleCase}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="offeredBy">OFFERED BY</label>
          <input
            type="text"
            id="offeredBy"
            name="offeredBy"
            value={formData.offeredBy}
            onChange={handleChange}
            onKeyUp={handleCase}
            required
          />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}