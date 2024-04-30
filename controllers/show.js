const Show = require("../models/Show");

const getShows = async (genre, sort) => {
  try {
    let filters = {};
    let sortQuery = { _id: 1 };
    if (genre) {
      filters.genre = genre;
    }
    if (sort === "title") sortQuery = { title: 1 };
    if (sort === "rating") sortQuery = { rating: -1 };
    const shows = await Show.find(filters).sort(sortQuery);
    return shows;
  } catch (e) {
    throw new Error(e);
  }
};

const getShowsById = async (id) => {
  try {
    const show = await Show.findById(id);
    return show;
  } catch (e) {
    throw new Error(e);
  }
};

const addShow = async (show) => {
  try {
    const newShow = new Show(show);
    //save the movie with mongodb
    await newShow.save();

    return newShow;
  } catch (e) {
    throw new Error(e);
  }
};

const updateShow = async (id, show) => {
  try {
    const updatedShow = await Show.findByIdAndUpdate(id, show, {
      new: true,
    });
    return updatedShow;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteShow = async (id) => {
  try {
    await Show.findByIdAndDelete(id);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getShows,
  getShowsById,
  addShow,
  updateShow,
  deleteShow,
};
