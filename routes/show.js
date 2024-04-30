const express = require("express");
const router = express.Router();
const Show = require("../models/Show");
const { addShow, updateShow, deleteShow, getShowsById, getShows } = require("../controllers/show");

//create express router for "movies"
router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const sort = req.query.sort;
    const shows = await getShows(genre, sort);
    if (shows) {
      res.status(200).send(shows);
    } else {
      res.status(404).send("Shows not found");
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const show = await getShowsById(req.params.id);
    if (show) {
      res.status(200).json(show);
    } else {
      res.status(404).json("Show not found");
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const show = {
      title: req.body.title,
      creator: req.body.creator,
      premiere_year: req.body.premiere_year,
      end_year: req.body.end_year,
      season: req.body.season,
      genre: req.body.genre,
      rating: req.body.rating,
    };
    const newShow = await addShow(show);
    res.status(200).json(newShow);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const target = await Show.findById(id);
    if (!target) res.status(404).json("Show not found");
    else {
      const show = {
        title: req.body.title,
        creator: req.body.creator,
        premiere_year: req.body.premiere_year,
        end_year: req.body.end_year,
        season: req.body.season,
        genre: req.body.genre,
        rating: req.body.rating,
      };
      const updatedShow = await updateShow(id, show);
      res.status(200).json(updatedShow);
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const target = await Show.findById(req.params.id);
    if (!target) res.status(404).json("Show not found");
    else {
      await deleteShow(req.params.id);
      res.status(200).json("Show removed successfully");
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
