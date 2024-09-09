const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {authToken} = require('./userAuth');
//  user signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    let existingEmail = await User.findOne({ email});
    if (existingEmail) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    if(password.length < 5){
      return res.status(400).json({ msg: 'Password length should be greater than 5' });
    }
    const hashPass = await bcrypt.hash(password , 12);
    const newUser = new User({
      username,
      email,
      password: hashPass,
      balance: 0  // Initialize balance to 0
    });

    await newUser.save();
    res.json({ msg: 'User registered successfully', newUser});

  } catch (error) {
    // console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// user signin
router.post('/signin' , async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    await bcrypt.compare(password , user.password , (err , data) =>{
      if (data) {
        
        const token = jwt.sign({ username: username} , "stake123");
        return res.status(200).json({ id : user._id , token : token });
      }
      else{
        res.status(400).json({ msg: 'Invalid Credentials' });
      }
    });

  } catch (error) {
    // console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});


// get user info

router.get("/getuser" , authToken , async (req,res) =>{
  try {
    const {id} = req.headers;
    const data = await User.findById(id).select('-password');
    return res.status(200).json(data);

  } catch (error) {
    // console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
})

// update balance

router.put("/updatebalance" , authToken , async (req,res) =>{
  try {
    const {id} = req.headers;
    const {balance} =req.body;
    await User.findByIdAndUpdate(id , {balance : balance});
    return res.status(200).json({msg: "Balance Updated successfully"});
  } catch (error) {
    // console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;
