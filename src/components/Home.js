import React, { useState } from 'react'
import GameFeed from './GameFeed'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Route,  Routes } from 'react-router-dom'
import { Outlet } from 'react-router-dom';

import axios from 'axios'
export default function Home(props) {
  
  return (
    <div>
      <Navbar toggleSidebar = {props.toggleSidebar}  show={props.show} balance={props.balance} handleShow={props.handleShow}/>
      <Sidebar show={props.show} style={{"width" : "15%"}} />
      <div >
        <Outlet />
      </div>
    </div>
  )
}