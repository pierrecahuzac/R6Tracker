const express = require("express");
const router = express.Router();
const RoundController = require("./controller");


router.post(
  "/create",   
  RoundController.create
);



module.exports = router;
