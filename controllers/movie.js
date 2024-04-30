const Movie = require("../models/Movie");

const getMovies = async (genre, sort) => {
  try {
    let filters = {};
    let sortQuery = { _id: 1 };
    if (genre) {
      filters.genre = genre;
    }
    if (sort === "title") sortQuery = { title: 1 };
    if (sort === "rating") sortQuery = { rating: -1 };
    const movies = await Movie.find(filters).sort(sortQuery);
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
