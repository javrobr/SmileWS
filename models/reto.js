// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var RetoSchema   = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  tiempo: Number,
  monedas: Number,
  video: String,
});

// Export the Mongoose model
module.exports = mongoose.model('Reto', RetoSchema);
