import axios from "axios";
import { router } from "expo-router";

export const createNewGame = async (
    player: { id: string },
    setGame: any
) => {
    const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL;
    const response = await axios.post(`${baseAPIURL}/game/create`, {
        playerId: player.id,
    });
    if (response.status === 201) {
        setGame(response.data);
        router.navigate("./newGame");
    }
};

