const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ShowSchema = new Schema({
  title: { type: String, required: true },
  creator: { type: String, required: true },
  premiere_year: { type: Number, required: true },
  end_year: { type: Number, default: null },
  season: { type: Number, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Show = model("Show", ShowSchema);
module.exports = Show;
