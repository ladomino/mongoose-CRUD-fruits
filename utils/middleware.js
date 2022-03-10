/////////////////////////////////////////////
// Dependencies
/////////////////////////////////////////////

require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");

//////////////////////////////////////
// Controllers
const FruitRouter = require('../controllers/fruit.js');
const UserRouter = require('../controllers/user.js');

// session middleware requirements
const session = require("express-session");
// this allows us to save our session in mongo
const MongoStore = require("connect-mongo");

//////////////////////////////////////////////
//   Middleware Function
/////////////////////////////////////////////
const middleware = (app) => {
    app.use(morgan("tiny")); //logging
    app.use(methodOverride("_method")); // override for put and delete requests from forms
    app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
    app.use(express.static("public")); // serve files from public statically
    app.use(
      session({
        secret: process.env.SECRET,
        store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
        saveUninitialized: true,
        resave: false,
      })
    );
  };

///////////////////////////////////////////
// Export Middleware Function
//////////////////////////////////////////
module.exports = middleware;