import { createContext, useContext, useState } from "react";

const defaultPlayer = {
  id: "",
  username: "",
  email: "",
  isLoggedIn: false,
};
const defaultRound = {
  id: "",
  gameId: "",
  roundNumber: 0,
  sideId: "",
  winningSideId: "",
  operatorId: "",
  kills: 0,
  death: false,
  assists: 0,
  disconnected: false,
  points: 0,
};

const defaultContextValue = {
  gameModeChoosen: [],
  setGameModeChoosen: (side) => {},
  mapChoosen: undefined,
  setMapChoosen: () => {},
  round: defaultRound,
  setRound: (side) => {},
  score: [],
  setScore: () => {},
  player: defaultPlayer,
  setPlayer: (player) => {},
  game: {},
  setGame: (game) => {},
};

const defaultGame = {
  accountId: "",
  createdAt: "",
  date: "",
  id: "",
  mapId: "",
  modeId: "",
  opponentScore: 0,
  overtime: false,
  platformId: null,
  playerId: "",
  playerScore: 0,
  resultId: null,
  startingSideId: null,
  totalAssists: 0,
  totalDeaths: 0,
  totalKills: 0,
  totalPoints: 0,
  updatedAt: null,
};

const GameContext = createContext(defaultContextValue);

export const GameProvider = ({ children }) => {
  const [gameModeChoosen, setGameModeChoosen] = useState(
    defaultContextValue.gameModeChoosen
  );
  const [mapChoosen, setMapChoosen] = useState(defaultContextValue.mapChoosen);
  const [round, setRound] = useState(defaultContextValue.round);
  const [score, setScore] = useState(defaultContextValue.score);
  const [player, setPlayer] = useState(defaultPlayer);
  const [game, setGame] = useState(defaultGame);

  const value = {
    gameModeChoosen,
    setGameModeChoosen,
    mapChoosen,
    setMapChoosen,
    round,
    setRound,
    score,
    setScore,
    player,
    setPlayer,
    game,
    setGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "useGameContext doit être utilisé à l'intérieur d'un GameProvider."
    );
  }

  return context;
};
