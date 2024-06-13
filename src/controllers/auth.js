const User = require("../models/user");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, position } = req.body;
    const hashedPassword = await bycript.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      position,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered succesfully." });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "User registration failed." });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loadedUser = await User.findOne({ email: email });
    if (!loadedUser) {
      throw new Error("a user with this email could not be found!");
    }
    const isPasswordCorrect = await bycript.compare(
      password,
      loadedUser.password
    );
    if (!isPasswordCorrect) {
      throw new Error("email or password is incorrect.");
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id,
      },
      "secretsecret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, userId: loadedUser._id });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: err.message });
  }
};

exports.checkToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token) {
      throw new Error("Not Authenticated");
    }
    let decoudedToken = jwt.verify(token, "secretsecret");
    if (!decoudedToken) {
      throw new Error("Not Authenticated");
    }
    res.status(200).json({ message: "Authenticated" });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: err.message });
  }
};
