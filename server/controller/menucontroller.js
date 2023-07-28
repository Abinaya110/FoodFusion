const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Menu = require('../models/menu');




// secret key for authentication jwt token
const JWT_SECRET_KEY = 'nezuko-chan';

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if exsiting user is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already registered' });
    }
    //hash the password 
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user in db

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    //generate a jwt token
    const token = jwt.sign({ user: { id: newUser._id, email: newUser.email } },JWT_SECRET_KEY);
    res.status(201).json({ message: 'User registered successfully.', token });
    console.log('User registered successfully')
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
 // login to user and generate token

  const loginUser = async(req,res)=>{
    try{
      const{email,password}= req.body;
      //check if the userexisting
      const user = await User.findOne({email});
      if(!user){
        return res.status(404).json({ message: 'Invalid username'});
      }
      // compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return res.status(404).json({ message: 'Invalid username'});
      }

      //generate a jwt token for theauthenticated user
      const token = jwt.sign({ user:{id:user._id,email:user.email} }, JWT_SECRET_KEY);

      
      res.json({message:'Login successful',token});
    }catch(err){console.log(err);
      res.status(500).json({message:"internal server error"});


    }
};

// create a new menu item
const createMenuItem = async(req,res)=>{
  try{
    const{name,description,price,category}=req.body;
    // Validate the required fields (you can add more validation as needed)
    if (!name || !description || !price|| !category) {
      return res.status(400).json({ message: 'Name, description, and price are required fields' });
    }

    // Create a new menu item using the Menu model
    const menuItem = new Menu({
      name,
      description,
      price,
      category
    });

    // Save the menu item to the database
    await menuItem.save();

    // Respond with the newly created menu item
    res.status(201).json({ message: 'Menu item created successfully', data: menuItem });
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  

module.exports = {
  registerUser,
  loginUser,
  createMenuItem
};


