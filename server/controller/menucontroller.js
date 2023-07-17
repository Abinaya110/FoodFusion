const menu = require('../models/menu');
const mongoose = require('mongoose');

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await menu.find({}).sort({});
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single recipe
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid recipe ID' });
  }

  try {
    const recipe = await menu.findById(id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new recipe
const createRecipe = async (req, res) => {
  const { name, cuisine, price } = req.body;

  try {
    const newRecipe = await menu.create({ name, cuisine, price });
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe
};
