const mongoose = require('mongoose');

// Create a schema for the food collection
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true

},
category: {
     type:'string',
     required: true,
     Optional:['Main course', 'Dessert', 'Beverage','others'],
},
// imageURL:{
//   type:'string',
// },
createdAt: {
  type: Date,
  default: Date.now,
},

  // ingredients: [String]
});

// Create a model for the food collection using the schema
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
