import { Button, View } from "react-native"
import { useGameContext } from "./contexts/gameContext"
import { router } from "expo-router"

type RoundType = {
    side: 'ATTACK' | 'DEFENSE'
}

const SideChoice = () => {

    const { round, setRound } = useGameContext()


    const chooseSide = (sideChoosen: 'ATTACK' | 'DEFENSE') => {
        setRound({
            ...round,
            side: sideChoosen
        });
        router.navigate('./operator')

    }
    return (
        <View>
            <Button  title='Attaque' onPress={() => chooseSide('ATTACK')} />
            <Button  title='Défense' onPress={() => chooseSide('DEFENSE')} />
        </View>
    )
}



export default SideChoice