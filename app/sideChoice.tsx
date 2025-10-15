import { router } from "expo-router"
import { Button, View, Text } from "react-native"
import { useGameContext } from "./contexts/gameContext"
import axios from "axios"
import { useEffect } from "react"

type RoundType = {
    side: 'ATTACK' | 'DEFENSE'
}
const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL;

const SideChoice = () => {
    const { round, setRound, player, game } = useGameContext()
    const chooseSide = async (sideChoosen: 'ATTACK' | 'DEFENSE') => {

        setRound({
            ...round,
            side: sideChoosen
        });

        try {
            const response = await axios.post(`${baseAPIURL}/round/create`, {
                sideChoosen,
                playerId: player.id,
                gameId: game.id
            })

            if (response.status === 201) {
                setRound({
                    ...round,
                    ...response.data,
                    side: sideChoosen
                })


                const handleUpdateGame = await axios.put(`${baseAPIURL}/game/update/${game.id}`, {
                    roundNumber: round.roundNumber + 1,

                })

                router.navigate('./operator')
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getAllRoundInGame = () => {
        const response = axios.get(`${baseAPIURL}/round/${game.id}`)
        console.log(response);


    }
    const fetchRoundsData = async () => {
        getAllRoundInGame()
    }
    useEffect(() => {
        fetchRoundsData()

    }, [])
    return (
        <View>
            <Text>Round: {round.roundNumber}</Text>
            <Button title='Attaque' onPress={() => chooseSide('ATTACK')} />
            <Button title='Défense' onPress={() => chooseSide('DEFENSE')} />
        </View>
    )
}

export default SideChoice
