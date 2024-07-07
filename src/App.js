
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';


function App() {
  const [show , setShow] = useState(false)
  let toggleSidebar = () =>{
    setShow(!show);
  }
  return (
    <div className="App">
      <Navbar toggleSidebar = {toggleSidebar} />
      <Sidebar show={show} />
    </div>
  );
}

export default App;
