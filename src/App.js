
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GameFeed from './components/GameFeed';


function App() {
  const [show , setShow] = useState(false)
  let toggleSidebar = () =>{
    setShow(!show);
  }
  return (
    <div className="App">
      <Navbar toggleSidebar = {toggleSidebar} />
      <Sidebar show={show} />
      <GameFeed/>
    </div>
  );
}

export default App;
