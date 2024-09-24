
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Square from './Square';
import './mine.css';
import axios from 'axios';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomMines() {
    let randomNumbers = [];
    while (randomNumbers.length < 3) {
        let randomNumber = getRandomInt(1, 25);
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }
    return randomNumbers;
}

export default function Mine(props) {
    const navigate = useNavigate();
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [betAmount, setBetAmount] = useState(10);
    const [multiplier, setMultiplier] = useState(1);
    const [mines, setMines] = useState(generateRandomMines());
    const [resetFlag, setResetFlag] = useState(false); // New state to trigger reset
    const userId = localStorage.getItem('userId'); 
    const token = localStorage.getItem('token') // Get the userId from localStorage
    const [message, setMessage] = useState("");
    const [balance, setBalance] = useState(0); // Track user balance
   


    const createBet = async (val) => {
        try {
            const response = await axios.post('http://localhost:1000/api/v1/bets', {
                
                game_name: "Mines",
                bet_amount: betAmount,
                payout_amount: val=="Win"?score:0,
                outcome:val,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    user_id: userId,
                },
            });
            
            console.log("Bet created:", response.data);
        } catch (error) {
            console.error("Error creating bet: ", error.response ? error.response.data : error.message);
        }
    };
    // Fetch user balance
    useEffect(() => {
        // localStorage.setItem('g_name' , "mines")
        // console.log(localStorage.getItem('g_name'))
        const fetchUserBalance = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/v1/getuser', {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      id: `${userId}`,
                    },
                  });
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching user balance: ", error);
            }
        };

        fetchUserBalance();
    }, [userId, token]);

    useEffect(() => {
        if (!userId) {
            // If userId is not found, redirect to login
            navigate('/signin');
        }
    }, [userId, navigate]);

    const updateBalance = async (amount) => {
        try {
            const response = await axios.post('http://localhost:1000/api/v1/update-balance', {
                userId: userId,
                amount: amount,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            props.fetchBalance();
            // Update local balance after bet result
            setBalance(balance + amount); 
        } catch (error) {
            console.error("Error updating balance: ", error.response ? error.response.data : error.message);
        }
    };

    const handleReset = () => {
        setGameOver(false);
        
        setScore(0);
        setBetAmount(10);
        setMultiplier(1);
        setMines(generateRandomMines());
        setResetFlag(prevFlag => !prevFlag); // Toggle resetFlag to trigger reset
        setMessage("");
    };

    const handleCollect =async () => {
        const winnings = score;
        await createBet("Win");
        setMessage(`You collected: ${winnings} points!`);
        updateBalance(winnings); // Add winnings to user's balance
        setGameOver(true);
        setTimeout(() => {
            handleReset();
        }, 1500);
    };

    const handleLoss = async () => {
        
        setMessage(`You lost ${betAmount} points from your balance. Better luck next time!`);
        updateBalance(-betAmount); // Deduct bet amount from user's balance

        await createBet("Lose");
        setTimeout(() => {
            handleReset();
        }, 1500);
    };

    const handleStartGame = () => {
        // Check if the user has enough balance to place the bet
        if (betAmount > balance) {
            setMessage("Insufficient balance! Please lower your bet.");
            return;
        }

        setMessage("Game Started!! Try your luck!!"); // Clear any previous message
        setGameOver(false); // Start the game
    };

    let items = [];
    for (let index = 1; index <= 25; index++) {
        items.push(
            <Square
                key={index}
                mine={mines.includes(index)}
                gameOver={gameOver}
                setGameOver={(isGameOver) => {
                    setGameOver(isGameOver);
                    if (isGameOver) {
                        handleLoss(); // Handle balance deduction on loss
                    }
                }}
                betAmount={betAmount}
                setScore={setScore}
                setMultiplier={setMultiplier}
                multiplier={multiplier}
                resetFlag={resetFlag} // Pass resetFlag to Square
            />
        );
    }

    return (
        <div className="game-container"  style={{'backgroundColor' : '#282c34', 'height':'100vh'}}>
            <div className="left-panel">
                {/* <div className="balance-section">
                    <h3>Balance</h3>
                    <p>{balance} points</p>
                </div> */}
                <div className="bet-section">
                    <h3>Bet Amount</h3>
                    <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(Number(e.target.value))}
                    />
                    
                </div>
                <div className="multiplier-section">
                    <h3>Multiplier</h3>
                    <p>{multiplier}x</p>
                </div>
                <div className="score-section">
                    <h3>Score</h3>
                    <p>{score}</p>
                </div>
                <div className="buttons">
                    <button className="collect-btn" onClick={handleCollect} disabled={gameOver}>
                        Collect Winnings
                    </button>
                    <button className="reset-btn" onClick={handleReset}>
                        Reset
                    </button>
                    <button className="btn btn-primary" onClick={handleStartGame}>
                        Bet
                    </button>
                </div>
                <div>
                    <span style={{ "fontSize": '30px'}}>{message}</span>
                </div>
            </div>
            <div className="right-panel d-grid">{items}</div>
        </div>
    );
}
