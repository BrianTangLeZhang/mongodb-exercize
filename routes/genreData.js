const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Show = require("../models/Show");

router.get("/", async (req, res) => {
  const genreList = [];
  let type = "movie";
  if (req.query.type) type = req.query.type;
  if (type === "movie") {
    const movies = await Movie.find();
    movies.forEach((m) => {
      if (!genreList.includes(m.genre)) genreList.push(m.genre);
    });
  }
  if (type === "show") {
    const shows = await Show.find();
    shows.forEach((s) => {
      if (!genreList.includes(s.genre)) genreList.push(s.genre);
    });
  }
  res.status(200).json(genreList);
});

module.exports = router;
