const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  available_on: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
