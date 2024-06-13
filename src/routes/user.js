const express = require("express");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/profile/:userId", isAuth, userController.getUserProfile);

router.post("/edit-profile", isAuth, userController.editProfile);

module.exports = router;
