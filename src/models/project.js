const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model("Project", projectSchema);
