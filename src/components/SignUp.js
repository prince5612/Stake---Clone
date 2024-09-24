import React, { useState } from "react";
import axios from 'axios';
import { Link  , useNavigate} from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate()
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
      const response = await axios.post('http://localhost:1000/api/v1/signup', formData);
      console.log(response.data);  // handle success
      navigate('/signin')
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);  // handle error from server
      } else {
        console.error('Error:', error.message);  // handle other errors
      }
    }
  };

  return (
    <div>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", minWidth: '100vw' }}
      >
        <div className="card p-4 col-md-6 col-lg-5">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                id="username"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                id="confirmPassword"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            <p className="mt-3 text-center">
              Already have an account?{" "}
              <Link to={"/signin"}  style={{ color: "#6200ea" }} > SignIn </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
