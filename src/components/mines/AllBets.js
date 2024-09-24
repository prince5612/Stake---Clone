import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllBets.css' // Import your custom CSS file

const AllBets = () => {
    const [bets, setBets] = useState([]);
    const userId=localStorage.getItem('userId')
    useEffect(() => {
        const fetchBets = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/v1/getallbets', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        user_id:userId,
                    },
                });
                setBets(response.data);
            } catch (error) {
                console.error('Error fetching bets:', error);
            }
        };

        fetchBets();
    }, []);

    return (
        <div className="bets-container" style={{'minHeight':'100vh'}}>
            <h1 style={{"color" : "white"}}>My Bets</h1>
            {bets.reverse().map((bet) => (
                <div 
                    key={bet._id} 
                    className={`bet-card ${bet.outcome === 'Lose' ? 'losing-bet' : 'winning-bet'}`}
                >
                    <span className="game-name">{bet.game_name}</span>
                    {/* <span className="username">{bet.user.username}</span> */}
                    <span className="bet-amount">Bet: ${bet.bet_amount} </span>
                    <span className="payout-amount">Payout: ${bet.payout_amount} </span>
                    <span className="outcome">{bet.outcome}</span>
                </div>
            ))}
        </div>
    );
};

export default AllBets;
