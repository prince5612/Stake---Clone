import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaWallet, FaTimes } from 'react-icons/fa';
import axios from 'axios';


const WalletModal = ({ showModal, handleClose, balance , fetchBalance }) => {
  const [amount, setAmount] = useState(0);
  const [action, setAction] = useState('deposit'); // 'deposit' or 'withdraw'
  const [message, setMessage] = useState(''); // 'deposit' or 'withdraw'
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleActionChange = (actionType) => {
    setMessage("")
    setAction(actionType);
    setAmount(0); // Reset amount when changing action
  };
  const createTransaction  = async (val) => {
    try {
        const response = await axios.post('http://localhost:1000/api/v1/transactions', {
            amount:amount,
            type: val,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                user_id: userId,
            },
        });
        
        console.log("Transaction created:", response.data);
    } catch (error) {
        console.error("Error creating bet: ", error.response ? error.response.data : error.message);
    }
};
  const updateBalance = async (amount) => {
    try {
        const response = await axios.post('http://localhost:1000/api/v1/update-balance', {
            userId: userId,
            amount: parseInt(amount),
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        fetchBalance();
        // Update local balance after bet result
         setAmount(balance + amount); 
    } catch (error) {
        console.error("Error updating balance: ", error.response ? error.response.data : error.message);
    }
};
  const handleSubmit = () => {
    
    if (action === 'deposit') {
      // Handle deposit logic here
      createTransaction('Deposit')
      updateBalance(parseInt(amount));
      console.log(`Deposited: $${amount}`);
      setMessage("")
      handleClose();
    } else {
      // Handle withdrawal logic here
      if(amount>balance){
        setMessage("You don't have enough balance!")  
      }
      else{
        createTransaction('Withdraw')
        setMessage("")
        updateBalance(-parseInt(amount));
        console.log(`Withdrew: $${amount}`);
        handleClose();
      }
      
    }
     // Close the modal after submission
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaWallet size={24} style={{ marginRight: '10px' }} />
          <h5 className="modal-title">Wallet</h5>
        </div>
        <Button variant="close" onClick={handleClose}>
          {/* <FaTimes /> */}
        </Button>
      </Modal.Header>
      <Modal.Body>
        <h5>Balance: ${balance}</h5>
        <div className="mb-3">
          <Button 
            variant={action === 'deposit' ? 'primary' : 'secondary'} 
            onClick={() => handleActionChange('deposit')}
            className="me-2"
          >
            Deposit
          </Button>
          <Button 
            variant={action === 'withdraw' ? 'primary' : 'secondary'} 
            onClick={() => handleActionChange('withdraw')}
          >
            Withdraw
          </Button>
        </div>
        <div>
          <input 
            type="number" 
            onChange={handleAmountChange} 
            placeholder={`Enter amount to ${action}`} 
            className="form-control" 
          />
        </div>
        <div>
          <span>{message}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {action === 'deposit' ? 'Deposit' : 'Withdraw'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WalletModal;
