import React, { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/register', {
        ...formData,
        tc: true,
      });

      if (res.data.status === 'Success') {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="auth-card">
        <h3 className="auth-title">Sign Up</h3>
        <p className="auth-subtitle">Create an account</p>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-3"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            className="form-control mb-3"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
          <button className="auth-btn w-100 text-white" type="submit">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-3">

        <p>
          Don't have an account ?{" "}
          <a href="/login" className="link-navy">
         Login
          </a>
        </p>        </div>
      </div>
    </div>
  );
};

export default Signup;
