const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const { getMovies, addMovie } = require("../controllers/movie");

//create express router for "movies"
router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const movies = await getMovies(genre, rating);
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

router.post("/", async (req, res) => {
  try {
    const movie = {
      title: req.body.title,
      director: req.body.director,
      release_year: req.body.release_year,
      genre: req.body.genre,
      rating: req.body.rating,
    };
    const newMovie = await addMovie(movie);
    res.status(200).send(newMovie);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const movie = {
      title: req.body.title,
      director: req.body.director,
      release_year: req.body.release_year,
      genre: req.body.genre,
      rating: req.body.rating,
    };
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, movie, {
      new: true,
    });
    res.status(200).send(updatedMovie);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    const movies = await Movie.find();
    res.status(200).send(movies);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = router;
