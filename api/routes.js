const express = require("express");
const router = express.Router();
const PlayerRouter = require("./src/player/router");

router.use("/api/player", PlayerRouter);


module.exports = router;