import React from "react";
import "./Sidebar.css";
import { Link , useNavigate} from "react-router-dom";

export default function Sidebar({ show }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/signin');
  };
  return (
    <>
      <div className={`${show ? "s-side-bar" : "container1"}`}>
        <div className="divHome">
          {/* <div href="#" className="links">
            <i class="fa-regular fa-star" style={{ color: "#ffffff" }}></i>
            <p className="mx-2 p">Favourites</p>
          </div> */}
          <Link to="/home/alltransactions" style={{'textDecoration' : 'none'}}>
          <div className="links">
            <i
              class="fa-solid fa-rotate-right fa-flip-horizontal"
              style={{ color: "#ffffff" }}
            ></i>
            <p className="mx-2 p" style={{ color: "#ffffff" }}>Recent</p>
          </div>
          </Link>
          <Link to="/home/allbets" style={{'textDecoration' : 'none'}}>
          <div className="links">
            <i class="fa-solid fa-snowflake" style={{ color: "#ffffff" }}></i>
            <p className="mx-2 p " style={{ color: "#ffffff" }}>My Bets</p>
          </div>
          </Link>

        </div>
        <hr />
        <div className="divCategory my-1">
          {/* <h6>Categories</h6> */}
          <Link to="/home/profile" style={{'textDecoration' : 'none'}}>
          <div className="links">
            <i class="fa-solid fa-user" style={{ color: "#ffffff" }}></i>
            <p className="mx-2 p" style={{ color: "#ffffff" }}>Profile</p>
          </div>
          </Link>
          <div href="#" className="links">
            <i class="fa-solid fa-landmark" style={{ color: "#ffffff" }}></i>
            <p className="mx-2 p" style={{ color: "#ffffff" }}>Wallet</p>
          </div>
          <div href="#" className="links">
            <i
              class="fa-solid fa-right-from-bracket"
              style={{ color: "#ffffff" }}
            ></i>
            <p className="mx-2 p" onClick={handleLogout} style={{ color: "#ffffff" }}>Logout</p>
          </div>
        </div>
      </div>
    </>
  );
}
