
import { useState , useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GameFeed from './components/GameFeed';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { Route , Routes } from 'react-router-dom';
import Home from './components/Home';
import Mine from './components/mines/Mine';
import axios from 'axios';
import AllBets from './components/mines/AllBets';
import WalletModal from './components/WalletModal';
import AllTransactions from './components/AllTransactions';
import Profile from './components/Profile';
// import getBalance from './components/Navbar'
function App() {
  const [show , setShow] = useState(false)
  const [balance, setBalance] = useState(0);
  let toggleSidebar = () =>{
    setShow(!show);
  }
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  
  const fetchBalance = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://localhost:1000/api/v1/getuser', {
        headers: {
          Authorization: `Bearer ${token}`,
          id: userId,
        },
      });
      setBalance(response.data.balance); // Update balance from backend
    } catch (error) {
      console.error('Error fetching balance', error);
    }
  };

  // Call fetchBalance initially when the component mounts
  useEffect(() => {
     fetchBalance();
     // console.log(balance)
  }, []);

 
  return (
    <div className="App">
    <Routes>
      <Route path ='/signup' element={<SignUp></SignUp>}></Route>
      <Route path = '/signin' element = {<SignIn></SignIn>}></Route>
      <Route path = '/' element = {<SignIn></SignIn>}></Route>
      <Route path = '/home' element = {<Home toggleSidebar={toggleSidebar} show ={show}  balance={balance} handleShow={handleShow}></Home>}>
        <Route index element={<GameFeed/>}/>
        <Route path="/home/mines" element={<Mine fetchBalance={fetchBalance} />}/>
        <Route path = '/home/allbets' element = {<AllBets/>}/>
        <Route path = '/home/alltransactions' element = {<AllTransactions/>}/>
        <Route path = '/home/profile' element = {<Profile/>}/>
      </Route>
      
      
    </Routes>
    <WalletModal 
        showModal={showModal} 
        handleClose={handleClose} 
        balance={balance} 
        fetchBalance={fetchBalance}
      />

  
  </div>

  );
}

export default App;
