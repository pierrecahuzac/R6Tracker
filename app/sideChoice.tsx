import { router } from "expo-router"
import { Button, View , Text} from "react-native"
import { useGameContext } from "./contexts/gameContext"
import axios from "axios"

type RoundType = {
    side: 'ATTACK' | 'DEFENSE'
}
const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL;

const SideChoice = () => {

    const { round, setRound, player, game } = useGameContext()
    console.log(round)
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
            setRound({
                ...round,
                ...response.data, // Fusionne toutes les nouvelles propriétés
                side: sideChoosen  // S'assure que la string 'ATTACK'/'DEFENSE' est conservée si l'API ne la retourne pas.
            })

            console.log(round);

        } catch (error) {
            console.log(error);
        }
        router.navigate('./operator')
    }

    return (
        <View>
            <Text>Round: {round.roundNumber}</Text>
            <Button title='Attaque' onPress={() => chooseSide('ATTACK')} />
            <Button title='Défense' onPress={() => chooseSide('DEFENSE')} />
        </View>
    )
}

export default SideChoice
