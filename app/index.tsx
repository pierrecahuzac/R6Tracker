import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGameContext } from "./contexts/gameContext";
import { Button, View } from "react-native";

import axios from "axios";
import { logout } from "./functions/player";
import { createNewGame } from "./functions/newGame";

const Index = () => {
  const { player, setPlayer, game, setGame } = useGameContext();





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

          <Button title="Déconnexion" color="#841584" onPress={() => logout(setPlayer)} />

          <Button title="Nouvelle partie" onPress={() => createNewGame(player, setGame)} />
          {/* <Link href={`/newGame`} style={{ marginTop: 20 }}>Nouvelle partie</Link> */}
        </View>
      ) : (
        <Link href={`/signin`}>Connexion</Link>
      )}
    </View>
  );
};

export default Index;
