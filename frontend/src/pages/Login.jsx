import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';


const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

      const { user, setUser } = useAuth();
  
    const navigate = useNavigate();


  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };




  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/login', credentials);
    
    // Set token and user info
    const user = res.data.user;
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('role' , JSON.stringify(res.data.user.role))
    setUser(user);
    
    alert('Login successful!'); 
    
    
    

    
    const role = localStorage.getItem('role');


    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else if (role === 'superadmin') {
      navigate('/superadmin-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
}

 



  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
