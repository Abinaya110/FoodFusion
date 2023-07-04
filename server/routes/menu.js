const express = require('express')
const menu = require('../models/menu')

const router =   express.Router()
//get
router.get('/', (req, res)=>{
    res.json({mssg:' get method success',})
})
//get single id request
router.get('/:id', (req, res)=>{
    res.json({mssg:'success',})
})  

//post request
router.post('/', async (req, res) => {
    const { name, cuisine, price, ingredients } = req.body;
  
    try {
      const newItem = await menu.create({ name, cuisine, price, ingredients });
      res.status(200).json(newItem);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  });
  

// delete request
router.delete('/', (req, res)=>{
    res.json({mssg:'delete method success',})
})

//update request
router.patch('/:id', (req, res)=>{
    res.json({mssg:'update method success',})
})



 
module.exports = router