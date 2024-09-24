import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css'; // Import your custom CSS

const Profile = () => {
  const [user, setUser] = useState({ username: '', email: '', balance: 0 });
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!userId || !token) {
      navigate('/signin'); // Redirect to login if not logged in
    } else {
      fetchUserProfile();
    }
  }, [navigate, userId, token]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:1000/api/v1/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: `${userId}`,
        },
      });
      setUser(response.data); // Assuming your API returns user details
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/signin');
  };

  const handleEditProfile = () => {
    // Redirect or show edit profile functionality
    console.log('Edit profile clicked');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-image"
          />
          <h2>{user.username}</h2>
        </div>
        <div className="profile-details">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Balance:</strong> ${user.balance}</p>
        </div>
        <div className="profile-actions">
          <button className="btn btn-primary" onClick={handleEditProfile}>
            Edit Profile
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
