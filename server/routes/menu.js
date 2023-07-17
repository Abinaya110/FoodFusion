const express = require('express');
const {
  createRecipe,
  getRecipeById,
  getAllRecipes
} = require('../controller/menucontroller');

const router = express.Router();

// Get all recipes
router.get('/', getAllRecipes);

// Get a single recipe by ID
router.get('/:id', getRecipeById);

// Create a new recipe
router.post('/', createRecipe);

// Delete a recipe
router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete method success' });
});

// Update a recipe
router.patch('/:id', (req, res) => {
  res.json({ message: 'Update method success' });
});

module.exports = router;
