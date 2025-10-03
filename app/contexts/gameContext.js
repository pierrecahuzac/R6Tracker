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
  setGameModeChoosen: () => {},
  mapChoosen: undefined,
  setMapChoosen: () => {},
  round: defaultRound,
  setRound: (side) => {},
  score: [],
  setScore: () => {},
  player: defaultPlayer,
  setPlayer: (player) => {},
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
