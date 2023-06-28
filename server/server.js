require('dotenv').config()
const express = require('express');
//express app
const app = express();

//middleware
app.use((req,res,next)=> {
    console.log(req.path,req.method)
    next()
})
//routes
app.get("/api",(req,res) => {
    res.json({"users":["shahana","abinaya","hema","mugilan","kavi","gopi","bala","prem"]})
})


//listern for requesting users 
app.listen(process.env.PORT,()=>{console.log("listening",process.env.PORT)})

