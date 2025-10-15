import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { Button, View, Text } from "react-native";
import { useGameContext } from "./contexts/gameContext";
import { useQuery } from "@tanstack/react-query";


const Maps = () => {


    const { game, setGame, player } = useGameContext()



    const fetchMaps = async () => {
        const response = await axios.get(`${baseAPIURL}/map/getAll`)
            ;
        return response.data;
    }
    const {
        data: mapsData,
        isLoading,
        error
    } = useQuery({
        queryKey: ['maps'],
        queryFn: fetchMaps
    })



    const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL

    const updateGame = async (mapChosen: string) => {

        try {
            const response = await axios.put(`${baseAPIURL}/game/update/${game.id}`, {
                data: {
                    map: mapChosen,
                }
            })


        } catch (error) {
            console.log(error);
            return
        }

    }

    const handleChooseMap = async (mapName: string, id: string) => {

        setGame({
            ...game,
            map: {
                name: mapName,
                id
            }
        })
        await updateGame(mapName, id)
        router.navigate("./sideChoice")


    }

    
    const playerLanguage = player.language
    return (
        <View>
            <Text>Liste des cartes</Text>
            {isLoading && <Text>Chargement...</Text>}
            {error && <Text>Erreur de chargement</Text>}
            {mapsData && mapsData.map((map: { name: string, nameFr: string, id: string }) => (
                playerLanguage === "Fr" ? (
                    <Button
                        title={map.nameFr}
                        key={map.id}
                        onPress={() => handleChooseMap(map.name, map.id)}
                    />
                ) : (
                    <Button
                        title={map.name}
                        key={map.id}
                        onPress={() => handleChooseMap(map.name, map.id)}
                    />
                )
            ))}
        </View>
    )
}

export default Maps