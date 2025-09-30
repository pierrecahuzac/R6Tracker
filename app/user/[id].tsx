import { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import axios from 'axios'
import { useLocalSearchParams } from "expo-router";
const User = () => {

    const params = useLocalSearchParams()
    console.log(params);
    document.title = `Profil ${params?.id}`;
    const [user, setUser] = useState<{}>()
    const [loading, setLoading] = useState(false);
    const fetchUserDatas = async () => {
        setLoading(true)
        try {
            const user = await axios.get('https://randomuser.me/api');
            setUser(user.data.results[0])
            setLoading(false)
        } catch (error) {
            setLoading(false)
            throw error
        }
    }
    useEffect(() => {
        fetchUserDatas()
    }, [])
    return (
        <View style={styles.userPage}>
            {loading ? <Text>Chargement...</Text> :

                <>
                    <Text>{params.id}</Text>
                    <Text>Page de l'utilisateur</Text>

                    <Text>{user ?
                        //@ts-ignore 
                        user.name.first : ''}</Text>
                    <Text>{user ?
                        //@ts-ignore 
                        user.name.last.toUpperCase() : ''}</Text>
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

export default User