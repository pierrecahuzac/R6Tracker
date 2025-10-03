import { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import axios from 'axios'
import { useLocalSearchParams } from "expo-router";

const Player = () => {

    const params = useLocalSearchParams()
    const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL

    
    document.title = `Profil ${params?.id}`;
    const [player, setPlayer] = useState<{}>()
    const [loading, setLoading] = useState(false);

    const fetchPlayerProfile = async () => {
        setLoading(true)
        const playerId = params.id
        
        
        try {
            const response = await axios.get(`${baseAPIURL}/player/findById/playerId/${playerId}`);
        
            setPlayer(response.data);

            setLoading(false)
        } catch (error) {
            setLoading(false)
            throw error
        }
    }
    useEffect(() => {
        fetchPlayerProfile()
    }, [])
    return (
        <View style={styles.userPage}>
            {loading ? <Text>Chargement...</Text> :

                <>
                    <Text>{params.id}</Text>
                    <Text>Page de l'utilisateur</Text>

                    <Text>{player ?
                        player?.name?.first : ''}</Text>
                    <Text>{player ?
                        player?.email?.toUpperCase() : ''}</Text>
                </>
            }

        </View>
    )

}

const styles = StyleSheet.create({
    userPage: {
        width: "100%",
        height: '100%'
    }

})

export default Player