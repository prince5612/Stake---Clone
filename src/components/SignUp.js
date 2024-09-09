import React, { useState } from "react";
import axios from 'axios';

export default function SignUp() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST form data to the backend
      const response = await axios.post('/api/users/signup', formData);
      console.log(response.data);  // handle success
    } catch (error) {
      console.error(error.response.data);  // handle error
    }
  };

  return (
    <div>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" , minWidth: '100vw'}}
      >
        <div className="card p-4 col-md-6 col-lg-5">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="username"  // Add name attribute
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                id="username"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"  // Add name attribute
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"  // Add name attribute
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"  // Add name attribute
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
            <p className="mt-3 text-center">
              Already have an account?{" "}
              <a href="#" style={{ color: "#6200ea" }}>
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
