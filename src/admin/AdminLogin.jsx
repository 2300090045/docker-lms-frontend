import { useState } from 'react';
import './admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../context/AuthContext'; 

export default function AdminLogin() 
{
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setIsAdminLoggedIn} = useAuth();

  const handleChange = (e) => 
  {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/admin/checkadminlogin`, formData);
      if (response.status === 200) 
      {
        setIsAdminLoggedIn(true);
        navigate("/adminhome");
      }
      else 
      {
        setMessage(response.data);
      }
    } 
    catch (error) 
    {
      if (error.response) 
      {
        setError(error.response.data);
      } 
      else 
      {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="form-container">
      <h3 className="form-heading">Admin Login</h3>
      {message ? (
        <p className="message-success">{message}</p>
      ) : (
        <p className="message-error">{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password" 
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button> 
      </form>
    </div> 
  );
}