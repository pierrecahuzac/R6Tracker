import axios from "axios";
// Ancien import de useEffect et useState
// import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Text, View } from "react-native";
import { useGameContext } from "./contexts/gameContext";
import { router } from "expo-router";


const NewGame = () => {
    document.title = "Nouvelle partie";
    const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL

  
    const { setGameMode, game } = useGameContext()
    console.log('game', game);

    const fetchGameModes = async (): Promise<{ id: string; name: string }[]> => {
        const response = await axios.get(`${baseAPIURL}/gameMode/getAll`);
        return response.data;
    }
    const queryClient = useQueryClient()

    const query = useQuery<{ id: string; name: string }[]>({
        queryKey: ['gameModes'],
        queryFn: fetchGameModes
    })
 

    const updateGame = async (modeName: string) => {
        console.log(modeName, game.id);
        try {
            const updatedGame = await axios.put(`${baseAPIURL}/game/update/${game.id}`, {
                data: {
                    gameMode: modeName,
                }
            });
            console.log(updatedGame);
            router.navigate("./maps")

        } catch (error) {
            console.log(error);
            return
        }
    }
    const onChooseGameMode = async (gameMode: { id: string, name: string }): Promise<void> => {
        console.log(gameMode);
        setGameMode(gameMode.name);
        await updateGame(gameMode.name)

    }
    return (
        <View>
            <Text>Nouvelle partie</Text>
            {query.isLoading && <Text>Chargement...</Text>}
            {query.isError && <Text>Erreur de chargement</Text>}
            {query.data && query.data.map((mode) => (
                <Button title={mode.name} key={mode.id ?? mode.name} onPress={() => onChooseGameMode(mode)} />
            ))}
        </View>

    )

}

export default NewGame