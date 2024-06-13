const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  position: {
    type: String,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
