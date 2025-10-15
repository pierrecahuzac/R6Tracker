import { useEffect } from "react"; 
import { Link } from "expo-router";

import { useGameContext } from "./contexts/gameContext";
import { Button, View, Text } from "react-native";

import axios from "axios";
import { logout } from "./functions/player";
import { createNewGame } from "./functions/newGame";
import { useQuery } from "@tanstack/react-query";

import Toast from 'react-native-toast-message';



const Index = () => {
  const { player, setPlayer, game, setGame } = useGameContext();


  const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL
  const fetchGames = async () => {
    try {
      const response = await axios.get(`${baseAPIURL}/game/findAll`);


      return response.data;
    } catch (error) {
      console.log(error);

    }
  }
  const { data: games, isLoading, error } = useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
    enabled: player.isLoggedIn
  })

  useEffect(() => {
    
    
    if(player.username) {
      setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: `Bienvenu ${player.username}!`, 
        autoHide:true,
        visibilityTime: 1000,
      })
    }, 1000)
    }
    
  }, [])

  return (
    
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {player && player.isLoggedIn === true ? (
          <View style={{ alignItems: "center" }}>
            <Link href={`/player/${player.id}`} style={{ marginBottom: 20 }}>
              Bienvenue, {player.username}
            </Link>

            <Link
              href={{ pathname: `/player/[id]`, params: { id: player.id } }}
              style={{ marginBottom: 4 }}
            >
              Profil
            </Link>
            <Link href={{
              pathname: ` /stats/[id]`,
              params: { id: player.id }
            }} style={{ marginBottom: 20 }}>
              Stats
            </Link>
            <View>
              <Text>Liste des parties en cours</Text>
              {isLoading && <Text>Chargement...</Text>}
              {error && <Text>Erreur de chargement</Text>}
              {games && games.map((game: { id: string }) => (
                <Text key={game.id}>{game.id}</Text>
              ))}
            </View>
            <Button title="Déconnexion" color="#841584" onPress={() => logout(setPlayer)} />

            <Button title="Nouvelle partie" onPress={() => createNewGame(player, setGame)} />
            {/* <Link href={`/newGame`} style={{ marginTop: 20 }}>Nouvelle partie</Link> */}
          </View>
        ) : (
          <Link href={`/signin`}>Connexion</Link>
        )}
        <Toast />
      </View>
   
  );
};

export default Index;
