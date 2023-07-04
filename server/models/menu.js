const mongoose = require('mongoose');

//creata a schema for food collection

const foodSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    cuisine:{  
        type: 'string',
        required: true
    },
    price: {
        type: Number,
        required: true
      },
      ingredients:['string'],
      createdAt: {
        type: Date,
        default: Date.now()
      }
});

const food =mongoose.model('food',foodSchema);

module .exports = food;