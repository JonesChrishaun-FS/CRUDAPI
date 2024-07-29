const express = require("express");
const passport = require("passport");

const passportService = require("../services/passport");

const protectedRoute = passport.authenticate("jwt", { session: false });

const router = express.Router();

const Movie = require("../models/movies.js");

const getMovie = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.findById(req.params.id);
    if (movies === null) {
      return res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.movie = movies;
  next();
};

// GET ALL
router.get("/", protectedRoute, async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID
router.get("/:id", getMovie, async (req, res) => {
  res.json(res.movie);
});

// CREATE
router.post("/", async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    available_on: req.body.available_on,
  });
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE BY ID
router.put("/:id", getMovie, async (req, res) => {
  if (req.body.title != null) {
    res.movie.title = req.body.title;
  }
  if (req.body.description != null) {
    res.movie.description = req.body.description;
  }
  if (req.body.available_on != null) {
    res.movie.available_on = req.body.available_on;
  }
  try {
    const updateMovie = await res.movie.save();
    res.json(updateMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE BY ID
router.delete("/:id", getMovie, async (req, res) => {
  try {
    await res.movie.remove();
    res.json({ message: "Movie removed" });
  } catch (error) {
    res.json(500).json({ message: error.message });
  }
});

module.exports = router;
