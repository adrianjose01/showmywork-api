const User = require("../models/user");

exports.getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const newUser = await User.findById(userId);
    res.json({ user: newUser });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "Something went wrong!" });
  }
};

exports.editProfile = async (req, res, next) => {
  try {
    const { userId, description, position, imageUrl } = req.body;
    const oldUser = await User.findById(userId);
    oldUser.description = description;
    oldUser.imageUrl = imageUrl;
    oldUser.position = position;
    await oldUser.save();
    res.status(201).json({ message: "User updated succesfully!" });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "Something Went wrong!" });
  }
};
