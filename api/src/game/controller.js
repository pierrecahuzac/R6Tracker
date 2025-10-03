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
    console.log(playerToFind);

    const game = await prisma.game.create({
      data: {
        playerId: playerToFind.id,
        
      },
    });

    return res.status(201).json(game);
  },
};

module.exports = GameController;
