import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllTransactions.css' // Import your custom CSS file

const AllTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const userId=localStorage.getItem('userId')
    useEffect(() => {
        const fetchTrans = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/v1/getalltransactions', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        user_id:userId,
                    },
                });
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching bets:', error);
            }
        };

        fetchTrans();
    }, [transactions]);

    return (
        <div className="bets-container" style={{'minHeight':'100vh'}}>
            <h1 style={{"color" : "white"}}>My Transactions</h1>
            {transactions.reverse().map((tran) => (
                <div 
                    key={tran._id} 
                    className={`bet-card winning-bet`}
                >
                    <span className="game-name">Type:{tran.type}</span>
                    {/* <span className="username">{bet.user.username}</span> */}
                    <span className="bet-amount">Amount: ${tran.amount} </span>
                    <span className="payout-amount">Date: {tran.date} </span>
                    {/* <span className="outcome">{bet.outcome}</span> */}
                </div>
            ))}
        </div>
    );
};

export default AllTransactions;
