/////////////////////////////////////////////
// Import dependencies
/////////////////////////////////////////////
const mongoose = require('./connection');

/////////////////////////////////////////////
// Define our User Model
/////////////////////////////////////////////
// this is called destructuring
// pulling schema and model items from an object
const {Schema, model} = mongoose

// make user schema
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  // make user model
  const User = model("User", userSchema);
  
  ///////////////////////////////////////////////////
  // Export Model
  ///////////////////////////////////////////////////
  module.exports = User;