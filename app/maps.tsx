import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { Button, View, Text } from "react-native";
import { useGameContext } from "./contexts/gameContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { log } from "console";

const Maps = () => {
    const queryClient = useQueryClient()

    const { mapChosen, setMapChosen, player, game } = useGameContext()
    console.log(game.id);


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


    const [mapsList, setMapsList] = useState([])
    const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL

    const updateGame = async (mapChosen: string) => {
        console.log(mapChosen);
        try {
            const response = await axios.put(`${baseAPIURL}/game/update/${game.id}`, {
                data: {
                    map: mapChosen,
                }
            })
            console.log(response);

        } catch (error) {
            console.log(error);
            return
        }

    }

    const handleChooseMap = async (mapName: string) => {
        setMapChosen(mapName)
        await updateGame(mapName)
        router.navigate("./sideChoice")


    }
    return (
        <View>
            <Text>Liste des cartes</Text>
            {isLoading && <Text>Chargement...</Text>}
            {error && <Text>Erreur de chargement</Text>}

            {mapsData && mapsData.map((map: { name: string }) => (
                <Button title={map.name} key={map.name} onPress={() => handleChooseMap(map.name)} />
            ))
            }
        </View>
    )
}

export default Maps