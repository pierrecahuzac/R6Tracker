import { Button, TextInput, View, StyleSheet, Text, Pressable } from "react-native"
import { useGameContext } from "./contexts/gameContext";
import { useEffect } from "react";
import axios from "axios";
import { router } from "expo-router";

// --- Types pour la réutilisation des boutons ---
type StatKey = 'kills' | 'assists' | 'death' | 'disconnected';

interface StatButtonProps {
    title: string;
    value: number | boolean;
    stat: StatKey;
    setRound: (newRound: any) => void;
    round: any; // Idéalement, utilisez le type de 'round' ici
}

/**
 * Composant réutilisable pour mettre à jour une stat spécifique (kills, assists, death, etc.).
 */
const StatButton = ({ title, value, stat, setRound, round }: StatButtonProps) => (
    <View style={styles.button_container}>
        <Button
            title={title}
            // La couleur peut indiquer l'état sélectionné, par exemple
            color={round[stat] === value ? '#3498db' : '#2c3e50'}
            onPress={() => {
                setRound({
                    ...round,
                    [stat]: value // Utilisation d'une clé dynamique pour mettre à jour la stat
                });
            }}
        />
    </View>
);


const Round = () => {
    const { round, setRound, game } = useGameContext()
    const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL

    const statValues = [0, 1, 2, 3, 4, 5];
    const statValuesResult = ["Victory", "Defeat", "Draw"];

    const validRound = async () => {
        try {
            const response = await axios.put(`${baseAPIURL}/round/update/${round.id}`, {
                round
            })
            console.log(response);
            if (response.status === 200) {
                setRound({
                    id: '',
                    roundNumber: round.roundNumber + 1,

                    gameId: game.id,

                    sideId: "",
                    sideName: "",
                    winningSideId: "",
                    operatorId: "",
                    kills: 0,
                    death: false,
                    assists: 0,
                    disconnected: false,
                    points: 0,

                }),

                    router.navigate('/sideChoice')
            }


        } catch (error) {
            console.log(error);

        }
    }


    const handlePointChange = (text: string) => {

        const numericValue = text.replace(/[^0-9]/g, '');


        const value = parseInt(numericValue);

        setRound({
            ...round,

            points: isNaN(value) ? 0 : value
        })
    }

    return (
        <View style={styles.main_container}>
            <Text style={styles.title}>Round {round.roundNumber + 1}</Text>

            <View style={styles.score_container}>
                <Text style={styles.score_text}>Score 0 - 0</Text>
            </View>

            {/* Section VICTOIRE */}
            <View style={styles.stat_group}>
                <Text style={styles.stat_label}>Résultat du Round</Text>
                <View style={styles.buttons_row}>
                    {statValuesResult.map(roundResult => (
                        <StatButton
                            key={roundResult}
                            title={roundResult}
                            value={roundResult}
                            stat="result"
                            setRound={setRound}
                            round={round}
                        />
                    ))}
                </View>
            </View>
            {/* Section KILLS */}
            <View style={styles.stat_group}>
                <Text style={styles.stat_label}>Kills</Text>
                <View style={styles.buttons_row}>
                    {statValues.map(value => (
                        <StatButton
                            key={`kill-${value}`}
                            title={String(value)}
                            value={value}
                            stat="kills"
                            setRound={setRound}
                            round={round}
                        />
                    ))}
                </View>
            </View>

            {/* Section ASSISTS */}
            <View style={styles.stat_group}>
                <Text style={styles.stat_label}>Assists</Text>
                <View style={styles.buttons_row}>
                    {statValues.map(value => (
                        <StatButton
                            key={`assist-${value}`}
                            title={String(value)}
                            value={value}
                            stat="assists"
                            setRound={setRound}
                            round={round}
                        />
                    ))}
                </View>
            </View>

            {/* Section MORT */}
            <View style={styles.stat_group}>
                <Text style={styles.stat_label}>Mort</Text>
                <View style={styles.buttons_row}>
                    <StatButton title="Oui" value={true} stat="death" setRound={setRound} round={round} />
                    <StatButton title="Non" value={false} stat="death" setRound={setRound} round={round} />
                </View>
            </View>

            {/* Section DÉCONNEXION */}
            <View style={styles.stat_group}>
                <Text style={styles.stat_label}>Déconnexion</Text>
                <View style={styles.buttons_row}>
                    <StatButton title="Oui" value={true} stat="disconnected" setRound={setRound} round={round} />
                    <StatButton title="Non" value={false} stat="disconnected" setRound={setRound} round={round} />
                </View>
            </View>

            {/* Section POINTS (TextInput corrigé) */}
            <View style={styles.points_input_container}>
                <TextInput
                    style={styles.text_input}
                    placeholder="Points"
                    // 🚨 Correction : S'assurer que la 'value' du TextInput est une chaîne
                    value={round.points !== undefined ? String(round.points) : ''}
                    keyboardType="numeric"
                    onChangeText={handlePointChange}
                />
                <Text style={styles.points_text}>points</Text>
            </View>

            {/* Affichage du récapitulatif conditionnel */}
            {
                round.roundNumber > 1 &&
                <View style={styles.recap_container}>
                    <Text>Récapitulatif (Round précédent) :</Text>
                    <Text>Kill : {round.kills}</Text>
                    <Text>Assists : {round.assists}</Text>
                    <Text>Points : {round.points}</Text>
                    <Text>Mort : {round.death ? 'Oui' : 'Non'}</Text>
                    <Text>Déconnexion : {round.disconnected ? 'Oui' : 'Non'}</Text>
                </View>
            }

            <View style={styles.submit_button_container}>
                <Button title="Valider le round" onPress={() => validRound()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        padding: 15,
        // Ajoutez des marges ou paddings globaux si nécessaire
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    score_container: {
        alignItems: 'center',
        marginVertical: 15,
    },
    score_text: {
        fontSize: 20,
    },
    stat_group: {
        marginBottom: 20,
        // Ajout d'une bordure ou d'un style pour séparer les groupes
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    stat_label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    buttons_row: {
        flexDirection: "row",
        justifyContent: 'space-between',
        // Utiliser wrap pour les longues listes de boutons
        flexWrap: 'wrap',
    },
    button_container: {
        // Pour donner un espace entre les petits boutons
        marginHorizontal: 4,
        flexGrow: 1, // Permet aux boutons de prendre plus de place
        minWidth: '10%', // S'assurer que les boutons sont utilisables
    },
    points_input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    text_input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 8,
        flex: 1, // Prend le maximum d'espace disponible
        marginRight: 10,
        fontSize: 16,
    },
    points_text: {
        fontSize: 16,
    },
    recap_container: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginTop: 15,
    },
    submit_button_container: {
        marginTop: 20,
    }
})


export default Round