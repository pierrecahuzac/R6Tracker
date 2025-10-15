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


    const {  game, setGame } = useGameContext()
   

    const fetchGameModes = async (): Promise<{ id: string; name: string }[]> => {
        const response = await axios.get(`${baseAPIURL}/gameMode/getAll`);
        return response.data;
    }
    

    const query = useQuery<{ id: string; name: string }[]>({
        queryKey: ['gameModes'],
        queryFn: fetchGameModes
    })


    const updateGame = async (modeName: string) => {
   
        try {
            const updatedGame = await axios.put(`${baseAPIURL}/game/update/${game.id}`, {
                data: {
                    gameMode: modeName,
                }
            });
      
            router.navigate("./maps")

        } catch (error) {
            console.log(error);
            return
        }

    }
    const onChooseGameMode = async (gameMode: { id: string, name: string }): Promise<void> => {
   
       
        setGame({
            ...game, 

            gameMode: {
                id: gameMode.id,
                name: gameMode.name
            }

        });
        await updateGame(gameMode.name)

    }
    return (
        <View>
            <Text>Nouvelle partie</Text>
            <Text>{game.id}</Text>
            {query.isLoading && <Text>Chargement...</Text>}
            {query.isError && <Text>Erreur de chargement</Text>}
            {query.data && query.data.map((mode) => (
                <Button title={mode.name} key={mode.id ?? mode.name} onPress={() => onChooseGameMode(mode)} />
            ))}
        </View>

    )

}

export default NewGame