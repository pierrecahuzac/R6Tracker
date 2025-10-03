import axios from "axios";
import { useEffect, useState } from "react"
import { Button, View } from "react-native"
import { useGameContext } from "./contexts/gameContext";
import { router } from "expo-router";
const NewGame = () => {
    document.title = "Nouvelle partie";
    const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL


    const [ gameMode, setGameMode ] = useState([])
    const { gameModeChoosen, setGameModeChoosen } = useGameContext()


    useEffect(() => {
        fetchGameModes()
    }, [])



    const fetchGameModes = async () => {
        const response = await axios.get(`${baseAPIURL}/gameMode/getAll`)
        console.log(response);
        setGameMode(response.data);
    }

    const onChooseGameMode = (gameMode: string) => {     
        console.log(gameMode);
        
        setGameModeChoosen(gameMode)
           router.navigate("./maps")

    }
    return (
        <View>Nouvelle partie
            {gameMode && gameMode.map((mode: { name: string }) => (
                <Button title={mode.name} key={mode.name} onPress={(e) => onChooseGameMode(mode.name)} />
            ))}
        </View>

    )

}

export default NewGame