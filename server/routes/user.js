const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.view);

router.get("", (req, res) => {
  res.render("home");
});

module.exports = router;
