const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const RoundController = {
  create: async (req, res) => {
    const sideChoosen = req.body.sideChoosen;

    const playerId = req.body.playerId;
    const gameId = req.body.gameId;

    if (playerId === "undefined") {
      return;
    }

    // const playerToFind = await prisma.player.findUnique({
    //   where: {
    //     id: String(playerId),
    //   },
    // });

    const round = await prisma.round.create({
      data: {
        side: {
          connect: {
            name: sideChoosen,
          },
        },
        game: {
          connect: {
            id: gameId,
          },
        },
        roundNumber: 1,
        player: {
          connect: {
            id: playerId,
          },
        },
      },
    });
    


    return res.status(201).json(round);
  },
 
  updateByGameId: async (req, res) => {
    const gameId = req.params.gameId;


    const { modeName, mapName } = req.body.data; // 🚨 

    // 1. Initialiser l'objet de mise à jour des données
    const updateData = {};
    let mapIdToConnect = null;

    // ===================================================
    // 2. LOGIQUE POUR LA CARTE (Map)
    // ===================================================
    // 🚨 CORRECTION LOGIQUE: La condition pour vérifier si 'mapName' est fourni et non nul
    if (mapName) {
      // 🚨 CORRECTION SYNTAXE: Le champ unique dans le modèle Map est 'name', pas 'map'
      const mapToFind = await prisma.map.findUnique({
        where: {
          name: mapName, // Utilise le nom de la carte pour la trouver
        },
        select: {
          id: true,
        },
      });

      if (!mapToFind) {
        // Gérer le cas où la carte n'existe pas
        return res
          .status(404)
          .json({ error: `Carte '${mapName}' non trouvée.` });
      }

      mapIdToConnect = mapToFind.id;
    }

    // ===================================================
    // 3. CONSTRUCTION DE L'OBJET DATA POUR PRISMA
    // ===================================================

    // Mettre à jour la Carte (si mapIdToConnect est défini)
    if (mapIdToConnect) {
      updateData.map = {
        connect: { id: mapIdToConnect },
      };
    }
    // Si mapName était nul/vide et que vous voulez dissocier (déconnecter) la map:
    /* else if (mapName === null) {
        updateData.map = { disconnect: true };
    } */

    // Mettre à jour le Mode (si modeName est défini)
    if (modeName) {
      // Puisque 'name' est unique dans GameMode, cette syntaxe est CORRECTE.
      updateData.mode = {
        connect: { name: modeName },
      };
    }

    // 🚨 GÉRER LES CAS OÙ AUCUNE DONNÉE N'EST FOURNIE :
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "Aucune donnée de mise à jour valide fournie." });
    }

    // ===================================================
    // 4. EXÉCUTION DE LA MISE À JOUR
    // ===================================================
    const gameToFindAndUpdate = await prisma.game.update({
      where: {
        id: gameId,
      },
      data: updateData,
    });



    return res.status(200).json(gameToFindAndUpdate);
  },
};

module.exports = RoundController;
