const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




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














// // Get all recipes
// const getAllRecipes = async (req, res) => {
//   try {
//     const recipes = await menu.find({}).sort({});
//     res.status(200).json(recipes);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get a single recipe
// const getRecipeById = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: 'Invalid recipe ID' });
//   }

//   try {
//     const recipe = await menu.findById(id);

//     if (!recipe) {
//       return res.status(404).json({ error: 'Recipe not found' });
//     }

//     res.status(200).json(recipe);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Create a new recipe
// const createRecipe = async (req, res) => {
//   const { name, cuisine, price } = req.body;

//   try {
//     const newRecipe = await menu.create({ name, cuisine, price });
//     res.status(201).json(newRecipe);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

module.exports = {
  registerUser,
  loginUser
  
  
  
};
