////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();


/////////////////////////////////////////
// Routes
/////////////////////////////////////////
// The Signup Routes (Get => form, post => submit form)
// renders a signup form
router.get("/signup", (req, res) => {
    // res.send("sign up page")
    res.render("users/signup.liquid");
  });
  
// post to send the signup info
// router.post("/signup", (req, res) => {
//     // res.send("sign up post")
//     res.send("signup");
// });

// callback function is asynchronous and the
//  await will wait till it gets the data
router.post("/signup", async (req, res) => {
    // encrypt password
    // this will await before it moves on
    req.body.password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
    // create the new user
    User.create(req.body)
      .then((user) => {
        // redirect to login page
        res.redirect("/user/login");
      })
      .catch((error) => {
        // send error as json
        console.log(error);
        res.json({ error });
      });
  });

// get to render the login form
// The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
    // res.send("login page")
    res.render("users/login.liquid");
});

// post to send the login info and create a session
// router.post("/login", (req, res) => {
//     //res.send("log in-> post")
//     res.send("login");
// });
  
// post to send the login info and create a session
router.post("/login", async (req, res) => {
    // this is interesting notation
    // get the data from the request body
    const { username, password } = req.body;
    // search for the user
    User.findOne({ username })
      .then(async (user) => {
        // check if user exists
        if (user) {
          // check is user exists compare password
          const result = await bcrypt.compare(password, user.password);
          if (result) {

            // session is setup in server.js
            req.session.username = username;
            req.session.loggedIn = true;
            
            // redirect to fruits page if successful
            res.redirect("/fruits");
          } else {
            // error if password doesn't match
            res.json({ error: "password doesn't match" });
          }
        } else {
          // send error if user doesn't exist
          res.json({ error: "user doesn't exist" });
        }
      })
      .catch((error) => {
        // send error as json
        console.log(error);
        res.json({ error });
      });
  });

module.exports = router
