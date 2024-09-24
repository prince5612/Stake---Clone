import React from 'react'
import "./GameFeed.css"
import { Link } from 'react-router-dom'
export default function GameFeed() {
  return (
    <div  style={{'backgroundColor' : '#282c34', 'height':'100vh'}}>
      <div className='games'>
      <Link to = "/signin">
        <img src="/imgs/dice.avif" alt="" ></img>
      </Link>
      <Link to = "/signup">
        <img src="/imgs/limbo.avif" alt="" />
      </Link>
      
      <Link to="/home/mines">
          <img src="/imgs/mines.avif" alt="Mines Game" />
        </Link>
      
      <Link to = "/home">
        <img src="/imgs/plinko.avif" alt="" />
      </Link>
      
      <Link to = "/home">
        <img src="/imgs/comingsoon.webp" alt="" />
      </Link>
      
      </div>
    </div>
  )
}