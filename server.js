/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
// const mongoose = require("mongoose");
// const path = require("path")
const Fruit = require("./models/fruit.js");
const res = require("express/lib/response");



////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express());

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: false})); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.");
});


app.get("/fruits/seed", (req, res) => {
    // array of starter fruits
    const startFruits = [
      { name: "Orange", color: "orange", readyToEat: false },
      { name: "Grape", color: "purple", readyToEat: false },
      { name: "Banana", color: "orange", readyToEat: false },
      { name: "Strawberry", color: "red", readyToEat: false },
      { name: "Coconut", color: "brown", readyToEat: false },
    ];
  
    //*** When we seed data we need to remove any data previously 
    //
    // Delete all fruits
    // Fruit.deleteMany({}).then((data) => {
    Fruit.remove({}).then((data) => {
      // Seed Starter Fruits
      Fruit.create(startFruits)
        .then((data) => {
        // send created fruits as response to confirm creation
        res.send(data)
        // res.json(data);
      });
    });
  });


// index route
app.get("/fruits", (req, res) => {
    // find all the fruits
    Fruit.find({})
      // render a template after they are found
      .then((fruits) => {
        res.render("fruits/index.liquid", { fruits });
      })
      // send error as json if they aren't
      .catch((error) => {
        res.json({ error });
      });
  });

// new route
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.liquid");
});

  // create route
app.post("/fruits", (req, res) => {
    // This needs to do some setup for the checkbox before we can
    //  create.
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // create the new fruit
    Fruit.create(req.body)
      .then((fruits) => {
        // this shows the one object created and times
        //console.log(fruits)

        // redirect user to index page if successfully created item
        res.redirect("/fruits");
    })
    // send error as json
    .catch((error) => {
        console.log(error);
        res.json({ error });
    });
});

//update route - this comes from the form
app.put("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // update the fruit
    Fruit.findByIdAndUpdate(id, req.body, { new: true })
      .then((fruit) => {
        // redirect to main page after updating

        // can also go back to show page ?
        // res.redirect(`/fruits/$fruit.id`);
        res.redirect("/fruits");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });

// edit route
app.get("/fruits/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // get the fruit from the database
    Fruit.findById(id)
      .then((fruit) => {
        // render edit page and send fruit data
        res.render("fruits/edit.liquid", { fruit });
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });

// show route
app.get("/fruits/:id", (req, res) => {
    // get the id from params
const fruitId = req.params.id;

    // find the particular fruit from the database
    Fruit.findById(fruitId)
        .then((fruit) => {
        // render the template with the data from the database
        res.render("fruits/show.liquid", { fruit });
        // res.send a good way to verify the data you have
        //res.send(fruit);
        })
        .catch((error) => {
        console.log(error);
        res.json({ error });
    });
})

// Delete Route
app.delete("/fruits/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the fruit
    Fruit.findByIdAndRemove(id)
      .then((fruit) => {
        // redirect to main page after deleting
        res.redirect("/fruits");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));