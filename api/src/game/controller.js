const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const GameController = {
  create: async (req, res) => {
    const playerId = req.body.playerId;

    if (playerId === "undefined") {
      return;
    }

    const playerToFind = await prisma.player.findUnique({
      where: {
        id: String(playerId),
      },
    });
  

    const game = await prisma.game.create({
      data: {
        playerId: playerToFind.id,
      },
    });

    return res.status(201).json(game);
  },
  updateByGameId: async (req, res) => {
    const gameId = req.params.gameId;
    const { modeName } = req.body.data; 
    const gameToFindAndUpdate = await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        mode: { 
          connect: {
              name: modeName, 
          }
      },
      },
    });

    console.log(gameToFindAndUpdate);

    

    return res.status(201).json(gameToFindAndUpdate);
  },
};

module.exports = GameController;
