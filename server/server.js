require('dotenv').config()
const express = require('express');
const menuRoutes = require('./routes/menu');
//express app
const app = express();

//middleware
app.use((req,res,next)=> {
    console.log(req.path,req.method)
    next()
})
//routes
app.use('api/restaurant',menuRoutes)

//CONNECT TO DB
mongoose.connect(process.env.MONGODB_URI)


//listern for requesting users 
app.listen(process.env.PORT,()=>{console.log("listening",process.env.PORT)})

