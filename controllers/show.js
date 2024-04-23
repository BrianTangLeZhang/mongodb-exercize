const Show = require("../models/Show");

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
  addShow,
  updateShow,
  deleteShow
};
