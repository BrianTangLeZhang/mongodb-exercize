const express = require("express");
const router = express.Router();
const Show = require("../models/Show");
const { addShow, updateShow, deleteShow } = require("../controllers/show");

//create express router for "movies"
router.get("/", async (req, res) => {
  try {
    let shows = await Show.find();
    if (req.query.genre) shows = await Show.find({ genre: req.query.genre });
    if (req.query.rating)
      shows = await Show.find({ rating: { $gt: req.query.rating } });
    if (req.query.premiere_year) {
      const num = parseInt(req.query.premiere_year);
      shows = await Show.find({
        premiere_year: { $gt: num },
      });
    }
    if (shows) {
      res.status(200).json(shows);
    } else {
      res.status(404).json("Shows not found");
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
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
      res.status(200).json("Show updated successfully");
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
