const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const OperatorController = {
  getAll: async (req, res) => {
    console.log("ici");

    const operators = await prisma.operator.findMany();

    return res.status(200).json(operators);
  },
  getAllOperatorsBySide: async (req, res) => {
    console.log(req.params.side);
    const sideChoosen = req.params.side;
    
    try {
      const side = await prisma.side.findUnique({
        where: {
          name: sideChoosen,
        },
      });
      if(!side) {
        return res.status(404).json({ message: "Side non trouvée" });
      }
      
      
      const operators = await prisma.operator.findMany({
        where: {
         sideId: side.id
        },
      });
     return res.status(200).json(operators);
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
};

module.exports = OperatorController;
