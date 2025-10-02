const express = require("express");
const router = express.Router();
const PlayerRouter = require("./src/player/router");
const GameModeRouter= require("./src/gameMode/router");
const MapRouter= require("./src/map/router");

router.use("/api/player", PlayerRouter);
router.use("/api/gameMode", GameModeRouter);
router.use("/api/map", MapRouter);


module.exports = router;