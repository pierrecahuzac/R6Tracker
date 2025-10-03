import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGameContext } from "./contexts/gameContext";
import { Button, View } from "react-native";

import axios from "axios";

const Index = () => {
  const { player, setPlayer, game, setGame } = useGameContext();

  const logout = async () => {
    setPlayer({
      id: "",
      username: "",
      email: "",
    });

    try {
      await AsyncStorage.multiRemove([
        "playerId",
        "username",
        "email",
        "isLoggedIn",
      ]);
    } catch (e) {
      console.error("Erreur AsyncStorage:", e);
    }
    router.navigate("./");
  };
  console.log(player.id);

  const createNewGame = async () => {
    const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL;

    const response = await axios.post(`${baseAPIURL}/game/create`, {
      playerId: player.id,
    });
    console.log(response);

    if (response.status === 201) {
      setGame(response.data);
      router.navigate("./newGame");
    }
  };
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
          <Link href={`/stats/${player.id}`} style={{ marginBottom: 20 }}>
            Stats
          </Link>

          <Button title="Déconnexion" color="#841584" onPress={logout} />

          <Button title="Nouvelle partie" onPress={createNewGame} />
          {/* <Link href={`/newGame`} style={{ marginTop: 20 }}>Nouvelle partie</Link> */}
        </View>
      ) : (
        <Link href={`/signin`}>Connexion</Link>
      )}
    </View>
  );
};

export default Index;
