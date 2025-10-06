import { router } from "expo-router"
import { Button, View } from "react-native"
import { useGameContext } from "./contexts/gameContext"
import axios from "axios"

type RoundType = {
    side: 'ATTACK' | 'DEFENSE'
}
const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL;

const SideChoice = () => {

    const { round, setRound, player, game } = useGameContext()

    console.log(round);


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
            console.log(response);

        } catch (error) {
            console.log(error);

        }
        router.navigate('./operator')

    }

    return (
        <View>
            <Button title='Attaque' onPress={() => chooseSide('ATTACK')} />
            <Button title='Défense' onPress={() => chooseSide('DEFENSE')} />
        </View>
    )
}



export default SideChoice