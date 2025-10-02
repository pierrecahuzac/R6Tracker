const express = require("express");
const router = express.Router();
const GameController = require("./controller");



router.post(
  "/getAll",
  GameController.getAll
);


module.exports = router;
