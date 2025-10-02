import { Button, View } from "react-native"
import { useGameContext } from "./contexts/gameContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Maps = () => {
    const { mapChoosen, setMapChoosen } = useGameContext()
    useEffect(() => {
        fetchMaps()
    }, [])

    const [mapsList, setMapsList] = useState([])
    const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL

    const fetchMaps = async () => {
        const response = await axios.get(`${baseAPIURL}/map/getAll`)
        console.log(response);
        setMapsList(response.data);
    }
    return (
        <View>Liste des cartes

            {mapsList && mapsList.map((map: { name: string }) => (
                <Button title={map.name} key={map.name} />
            ))
            }
        </View>
    )
}

export default Maps