const express = require('express')
const{billing}=require('../controller/menucontroller')
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
router.post('/',billing );
  

// delete request
router.delete('/', (req, res)=>{
    res.json({mssg:'delete method success',})
})

//update request
router.patch('/:id', (req, res)=>{
    res.json({mssg:'update method success',})
})



 
module.exports = router