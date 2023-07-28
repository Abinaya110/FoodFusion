const express = require('express');
const router = express.Router();
const{registerUser,loginUser,createMenuItem}= require('../controller/menucontroller');
const authMiddleware = require('../middleware/authMiddleware');




// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    await registerUser(req,res);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'nm server error.' });
  }
});

// Route to login and generate JWT token
router.post('/login', async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'fgb server error.' });
  }
});

//post request
router.post('/recipes', authMiddleware, createMenuItem,async (req, res) => {
  try {
    const { name, description,price,category} = req.body;

        // Use the menuController.createMenuItem function to create a new menu item

    const newRecipe = await createMenuItem({ name, description,price,category});
    await createMenuItem.save();
    console.log(newRecipe);
    res.status(201).json({ message: 'Recipe added successfully.', recipe: newRecipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// get request routes for fetching all recipes

// router.get('/recipes',authMiddleware,async(req,res)=>{
  // try{
  //   const recipes = await recipes.fins({}).sort({});
  //   res.status(200).json(recipes);
  // }catch(e){
  //   res.status(404).json({errorMessage:err.message});
  // }
// });











module.exports= router;