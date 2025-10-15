import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Button } from "react-native"

const EndGame = () => {
    const params = useLocalSearchParams();
    const { status, score } = params;

    const statusText = (status: string) => {
        if (status === 'PLAYER_WON') {
            return 'Victoire'
        }
        else if (status === 'PLAYER_LOST') {
            return 'Défaite'
        }
        if (status === 'MATCH_DRAW') {
            return 'Match Nul'

        }
    }
    return (
        <View>

            <Text>Partie Terminée : {statusText(status)}</Text>
            <Text>Score : {score}</Text>
            <Button title="Nouvelle partie" onPress={() =>
                router.navigate('./newGame')
            } />
        </View>

    )

}

export default EndGame;