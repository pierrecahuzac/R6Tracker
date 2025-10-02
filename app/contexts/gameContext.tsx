import React, { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

// ⭐️ AJOUTEZ ce type pour définir la structure de chaque mode de jeu
interface GameModeData {
  id: number; // J'assume un ID
  name: string; // Utilisé pour le titre du bouton
  // Ajoutez ici toutes les autres propriétés que l'API vous renvoie
}

// 1. Définir le type de l'objet de contexte (avec le tableau)
export interface GameContextType {
  // ⭐️ gameModes (au pluriel) est un tableau d'objets GameModeData
  gameModeChoosen: GameModeData[]; 
  // ⭐️ setGameModes (au pluriel) pour mettre à jour le tableau
  setGameModeChoosen: Dispatch<SetStateAction<String>>;
  mapChoosen: GameModeData[]; 
  // ⭐️ setGameModes (au pluriel) pour mettre à jour le tableau
  setMapChoosen: Dispatch<SetStateAction<String>>;
}

// L'utiliser null comme valeur par défaut est une pratique courante en TypeScript.
const GameContext = createContext<GameContextType | null>(null);


// 3. Typage correct du composant Provider
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // ⭐️ L'état initial doit être un tableau vide
  const [gameModeChoosen, setGameModeChoosen] = useState<GameModeData[]>([]); 
  const [mapChoosen, setMapChoosen] = useState<GameModeData[]>([]); 

  const value = { gameModeChoosen, setGameModeChoosen,mapChoosen, setMapChoosen }; // <-- Définissez la valeur ici pour éviter le @ts-ignore

  return (
    // ⭐️ Retirez le @ts-ignore
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};


export const useGameContext = () => {
  const context = useContext(GameContext);

  if (context === null) {
    throw new Error("useGameContext doit être utilisé à l'intérieur d'un GameProvider.");
  }

  return context;
};