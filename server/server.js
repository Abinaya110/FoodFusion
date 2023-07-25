require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const menuRoutes = require('./routes/menu');

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
const router = express.Router();
app.use('/api', router);
router.use('/users', menuRoutes);

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the database');
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Setup model (if needed, you can define models in separate files)
const User = require('./models/user');

