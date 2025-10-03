const express = require("express");
const router = express.Router();
const PlayerRouter = require("./src/player/router");
const GameModeRouter= require("./src/gameMode/router");
const MapRouter= require("./src/map/router");
const OperatorRouter= require("./src/operator/router");

router.use("/api/player", PlayerRouter);
router.use("/api/gameMode", GameModeRouter);
router.use("/api/map", MapRouter);
router.use("/api/operator", OperatorRouter);



module.exports = router;