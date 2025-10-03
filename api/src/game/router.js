const express = require("express");
const router = express.Router();
const GameController = require("./controller");


router.post(
  "/create",

   
  GameController.create
);


module.exports = router;
