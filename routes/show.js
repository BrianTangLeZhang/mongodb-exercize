const express = require("express");
const router = express.Router();
const Show = require("../models/Show");

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
    const show = await Show.findById(req.params.id);
    if (show) {
      res.status(200).send(show);
    } else {
      res.status(404).send("Show not found");
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = router;
