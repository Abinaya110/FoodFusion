const mongoose = require('mongoose');

// Create a schema for the food collection
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
  // ingredients: [String]
});

// Create a model for the food collection using the schema
const food = mongoose.model('food', foodSchema);

module.exports = food;
