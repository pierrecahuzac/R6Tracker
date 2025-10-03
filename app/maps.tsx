import { Button, View } from "react-native"
import { useGameContext } from "./contexts/gameContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { router } from "expo-router";

const Maps = () => {
    const { mapChoosen, setMapChoosen, player } = useGameContext()
    useEffect(() => {
        fetchMaps()
    }, [])
   console.log('player',player);
   
    const [mapsList, setMapsList] = useState([])
    const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL

    const fetchMaps = async () => {
        const response = await axios.get(`${baseAPIURL}/map/getAll`)
        console.log(response);
        setMapsList(response.data);
    }
    const handleChooseMap = (mapName: string) => {
        setMapChoosen(mapName)

        console.log(mapName);
        router.navigate("./sideChoice")
        //router.navigate("./operator")

    }
    return (
        <View>Liste des cartes

            {mapsList && mapsList.map((map: { name: string }) => (
                <Button title={map.name} key={map.name} onPress={() => handleChooseMap(map.name)} />
            ))
            }
        </View>
    )
}

export default Maps