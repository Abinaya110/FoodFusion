const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  
} = require('../controller/menucontroller');

// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Route to login and generate JWT token
router.post('/login', async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


module.exports = router;