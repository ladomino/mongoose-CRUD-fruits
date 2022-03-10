/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
// const morgan = require("morgan"); //import morgan
// const methodOverride = require("method-override");
// const mongoose = require("mongoose");
// const path = require("path")

const FruitRouter = require('./controllers/fruit.js');
const UserRouter = require('./controllers/user.js');
const middleware = require('./utils/middleware.js');

// session middleware requirements
// const session = require("express-session");
// this allows us to save our session in mongo
// const MongoStore = require("connect-mongo");

// moving to fruit controller 
// const Fruit = require("./models/fruit.js");
//  Not sure if I need this
// const res = require("express/lib/response");



////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express());

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
// app.use(morgan("tiny")); //logging
// app.use(methodOverride("_method")); // override for put and delete requests from forms
// app.use(express.urlencoded({ extended: false})); // parse urlencoded request bodies
// app.use(express.static("public")); // serve files from public statically
// // middleware to setup session
// app.use(
//   session({
//     secret: process.env.SECRET,
//     store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
//     saveUninitialized: true,
//     resave: false,
//   })
// );

////////////////////////////////////////////
// Setup for Middleware
////////////////////////////////////////////
middleware(app);

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// send all /fruits routes to FruitRouter
app.use('/fruits', FruitRouter);
app.use('/user', UserRouter);


app.get("/", (req, res) => {
    res.send("your server is running... better catch it.");
    // res.render("index.liquid");
});


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));