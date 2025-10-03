import axios from "axios";
import { useEffect, useState } from "react"
import { Button, View, Text } from "react-native"
import { useGameContext } from "./contexts/gameContext";
import { router } from "expo-router";

const NewGame = () => {
    document.title = "Nouvelle partie";
    const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL

    const [gameMode, setGameMode] = useState([])
    const { gameModeChoosen, setGameModeChoosen, game } = useGameContext()

    useEffect(() => {
        fetchGameModes()
    }, [])



    const fetchGameModes = async (): Promise<void> => {
        const response = await axios.get(`${baseAPIURL}/gameMode/getAll`)
        console.log(response);

        setGameMode(response.data);
    }
    const updateGame = async () => {
        try {
            const response = await axios.put(`${baseAPIURL}/game/update/${game.id}`, {
                data: {
                    modeName: gameModeChoosen,
                }
            })
        } catch (error) {
            console.log(error);
            return
        }

    }
    const onChooseGameMode = async (gameMode: string): Promise<void> => {
        setGameModeChoosen(gameMode)
        await updateGame()
        router.navigate("./maps")
    }
    return (
        <View>
            <Text>Nouvelle partie</Text>

            {gameMode && gameMode.map((mode: { name: string }) => (
                <Button title={mode.name} key={mode.name} onPress={(e) => onChooseGameMode(mode.name)} />
            ))}
        </View>

    )

}

export default NewGame