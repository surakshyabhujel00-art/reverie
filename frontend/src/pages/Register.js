import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', age: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.age < 18) {
      alert('You must be 18+ to use Reverie');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      alert('Registration failed: ' + err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Join Reverie - 18+ Only</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <p>By registering, you confirm you are 18+ and agree to our Terms & Conditions</p>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Register;
