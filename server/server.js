//equire("dotenv").config({ path: "" });
require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const menuRoutes = require('./routes/menu');

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/restaurant', menuRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
