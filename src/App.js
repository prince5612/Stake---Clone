
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GameFeed from './components/GameFeed';
import SignUp from './components/SignUp';


function App() {
  const [show , setShow] = useState(false)
  let toggleSidebar = () =>{
    setShow(!show);
  }
  return (
    <div className="App">
      {/* <Navbar toggleSidebar = {toggleSidebar} />
      <Sidebar show={show} />
      <GameFeed/> */}

      <SignUp/>
    </div>
  );
}

export default App;
