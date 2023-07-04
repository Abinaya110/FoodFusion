const menu = require('../models/menu')


//get


//get all


//post
const billing=async (req,res)=> {
    const { name, cuisine, price, ingredients } = req.body;
  
    try {
      const newItem = await menu.create({ name, cuisine, price, ingredients });
      res.status(200).json(newItem);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };

//delete


//update

module.exports ={
    billing
};