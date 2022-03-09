
/////////////////////////////////////////////
// Import dependencies
/////////////////////////////////////////////
const mongoose = require('./connection');

/////////////////////////////////////////////
// Define our Fruits Model
/////////////////////////////////////////////
// this is called destructuring
// pulling schema and model items from an object
const {Schema, model} = mongoose

// make fruits schema
const fruitSchema = new Schema({
    name: {type: String},
    color: {type: String},
    readyToEat: {type: Boolean},
  }, {timestamps: true});
  
  // make fruit model
  const Fruit = model("Fruit", fruitSchema);

/////////////////////////////////////////////
// Export Fruits Model
/////////////////////////////////////////////
module.exports = Fruit