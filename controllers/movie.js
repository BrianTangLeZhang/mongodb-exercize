const Movie = require("../models/Movie");

const getMovies = async (genre, rating) => {
  try {
    let filters = {};
    if (rating) {
      filters.rating = { $gt: rating };
    }
    if (genre) {
      filters.genre = genre;
    }
    const movies = await Movie.find(filters);
    return movies;
  } catch (e) {
    throw new Error(e);
  }
};

const addMovie = async (movie) => {
  try {
    const newMovie = new Movie(movie);
    //save the movie with mongodb
    await newMovie.save();

    return newMovie;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getMovies,
  addMovie,
};
