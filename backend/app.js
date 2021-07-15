const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

//Import Routes
const User = require('./routes/UserRoute'); 
const Property = require('./routes/PropertyRoute'); 

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//Routes
app.use('/User', User);
app.use('/Property', Property);

module.exports = app;