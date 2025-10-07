import axios from "axios";
import { router } from "expo-router";;
import { ActivityIndicator, Alert, Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useGameContext } from "./contexts/gameContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Operator = {
    id: string;
    name: string;
    icon: string;
}


const Operator = () => {
    const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL
    const { round, setRound } = useGameContext()

    // @ts-ignore
    const roundSide = round.side


    const user = {
        preferences: {
            image: false,
            icon: true
        }
    }  

    const fetchOperatorsBySide = async () => {
        try {
            const response = await axios.get(`${baseAPIURL}/operator/getAllOperatorsBySide/${roundSide}`);
            if (Array.isArray(response.data)) {
                return response.data
            } else {
                throw new Error("Format de données invalide reçu de l'API.");
            }
        } catch (e) {
            console.error("Erreur de récupération des agents:", e);
            Alert.alert("Erreur de connexion", "Vérifiez la connexion au serveur API.");
        }
    }

    const {
        data: operators,
        isLoading,
        error
    } = useQuery({
        queryKey: ['operators'],
        queryFn: fetchOperatorsBySide
    })


    if (isLoading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.statusText}>Chargement des agents...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Réessayer" onPress={fetchOperatorsBySide} />
            </View>
        );
    }


    const operatorChoosen = (operator: Operator) => {
        setRound({
            ...round,
            operatorId: operator.id,
            operator
        });

        router.navigate('./round')



    }
    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.title}>Liste des agents ({operators.length})
                </Text>
            </View>
            <View style={styles.operator_list}>
                {
                    operators && operators.map((operator: Operator) => {
                        return (
                            <Pressable onPress={() => operatorChoosen(operator)} key={operator.id}>
                                {/* L'utilisatruer pourra choisir dans son profil si il préfére les icones ou les images */}
                                {user.preferences.icon ?
                                    <Image
                                        style={styles.operator__image} key={operator.id}
                                        source={{
                                            uri: operator.icon
                                            ,
                                        }}
                                        // Ajout d'une gestion d'erreur au cas où l'image ne se charge pas
                                        onError={(e) => console.log('Erreur de chargement image:', e.nativeEvent.error)}
                                    />
                                    :
                                    <Image
                                        style={styles.operator__image} key={operator.id}
                                        source={{
                                            uri: operator.image
                                            ,
                                        }}
                                        // Ajout d'une gestion d'erreur au cas où l'image ne se charge pas
                                        onError={(e) => console.log('Erreur de chargement image:', e.nativeEvent.error)}
                                    />
                                }
                            </Pressable>
                        )
                    }
                    )
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f9fa',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#343a40',
        textAlign: 'center',
    },

    operator_list: {

        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    operator: {
        width: 20,
        height: 20,
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 0,
        borderColor: '#8e8e8e',
        backgroundColor: 'red',
        alignItems: 'center',
        marginBottom: 10,
        overflow: "hidden"
    },
    operator__name: {
        paddingVertical: 8,
        // Suppression des propriétés de bordure/couleur/background redondantes avec 'operator'
        color: '#20232a',
        textAlign: 'center',
        fontSize: 20, // Réduit légèrement la taille de police pour un meilleur affichage
        fontWeight: 'bold',
    },
    operator__image: {
        // CRITIQUE: Les images en React Native DOIVENT avoir une largeur et une hauteur explicites.
        width: 60,
        height: 60,
        //borderRadius: 50, // Pour des images rondes (si souhaité)
        marginVertical: 10,
        borderColor: '#8e8e8e',
        borderWidth: 1,
    },
    statusText: {
        marginTop: 10,
        fontSize: 16,
        color: '#6c757d',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
    }
});


export default Operator
