import React from "react";
import "./Sidebar.css";

export default function Sidebar({ show }) {
  return (
    <>
      <div className={`${show ? "s-side-bar" : "container"}`}>
        <div className="divHome">
          <div href="#" className="links">
            <i class="fa-regular fa-star" style={{ color: "#ffffff" }}></i>
            <p className="mx-2 p">Favourites</p>
          </div>
          <div href="#" className="links">
            <i
              class="fa-solid fa-rotate-right fa-flip-horizontal"
              style={{ color: "#ffffff" }}
            ></i>
            <p className="mx-2 p">Recent</p>
          </div>
          <div href="#" className="links">
            <i class="fa-solid fa-snowflake" style={{ color: "#ffffff" }}></i>
            <p className="mx-2 p ">My Bets</p>
          </div>
        </div>
        <hr />
        <div className="divCategory my-1">
          {/* <h6>Categories</h6> */}
          <div href="#" className="links">
            <i class="fa-solid fa-user" style={{ color: "#ffffff" }}></i>
            <p className="mx-2 p">Profile</p>
          </div>
          <div href="#" className="links">
            <i class="fa-solid fa-landmark" style={{ color: "#ffffff" }}></i>
            <p className="mx-2 p">Wallet</p>
          </div>
          <div href="#" className="links">
            <i
              class="fa-solid fa-right-from-bracket"
              style={{ color: "#ffffff" }}
            ></i>
            <p className="mx-2 p">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
}
