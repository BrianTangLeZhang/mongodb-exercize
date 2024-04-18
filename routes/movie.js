const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

//create express router for "movies"
router.get("/", async (req, res) => {
  try {
    let movies = await Movie.find();
    if (req.query.rating) {
      movies = await Movie.find({ rating: { $gt: req.query.rating } });
    }
    if (req.query.genre) {
      movies = await Movie.find({ genre: req.query.genre });
    }
    if (req.query.genre && req.query.rating) {
      movies = await Movie.find({
        genre: req.query.genre,
        rating: { $gt: req.query.rating },
      });
    }
    if (movies) {
      res.status(200).send(movies);
    } else {
      res.status(404).send("Movies not found");
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.status(200).send(movie);
    } else {
      res.status(404).send("Movie not found");
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = router;
