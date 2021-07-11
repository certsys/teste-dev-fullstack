const express = require("express");
const app = express();
const cors = require("cors");

//Import Routes
const User = require('./routes/UserRoute'); 
const Property = require('./routes/PropertyRoute'); 

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Routes
app.use('/User', User);
app.use('/Property', Property);

module.exports = app;