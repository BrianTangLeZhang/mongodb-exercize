const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const MovieSchema = new Schema({
  title: String,
  director: String,
  release_year: Number,
  genre: String,
  rating: Number,
});

const Movie = model("Movie", MovieSchema);
module.exports = Movie;
