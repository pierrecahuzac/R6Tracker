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
    const {gameMode, map}  = req.body.data
    
    const updateData = {};
    let mapIdToConnect = null;
    // ===================================================
    // 2. LOGIQUE POUR LA CARTE (Map)
    // ===================================================
    // 🚨 CORRECTION LOGIQUE: La condition pour vérifier si 'mapName' est fourni et non nul
    if (map) {
        // 🚨 CORRECTION SYNTAXE: Le champ unique dans le modèle Map est 'name', pas 'map'
        const mapToFind = await prisma.map.findUnique({
            where: {
                name: map, // Utilise le nom de la carte pour la trouver
            },
            select: {
                id: true
            }
        });

        if (!mapToFind) {
            // Gérer le cas où la carte n'existe pas
            return res.status(404).json({ error: `Carte '${mapName}' non trouvée.` });
        }
        
        mapIdToConnect = mapToFind.id;
    }
    
    // ===================================================
    // 3. CONSTRUCTION DE L'OBJET DATA POUR PRISMA
    // ===================================================
    
    // Mettre à jour la Carte (si mapIdToConnect est défini)
    if (mapIdToConnect) {
        updateData.map = {
            connect: { id: mapIdToConnect }
        };
    } 
    // Si mapName était nul/vide et que vous voulez dissocier (déconnecter) la map:
    /* else if (mapName === null) {
        updateData.map = { disconnect: true };
    } */


    // Mettre à jour le Mode (si modeName est défini)
    if (gameMode) {
        // Puisque 'name' est unique dans GameMode, cette syntaxe est CORRECTE.
        updateData.mode = {
            connect: { name: gameMode }
        };
    } 
    
    // 🚨 GÉRER LES CAS OÙ AUCUNE DONNÉE N'EST FOURNIE :
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "Aucune donnée de mise à jour valide fournie." });
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

module.exports = GameController;
