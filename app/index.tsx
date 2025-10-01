import { Button } from "@react-navigation/elements";

import { Link, router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";





const Index = () => {
  const playerId = localStorage.getItem('playerId');

  
  const logout = () => {
    localStorage.removeItem('playerId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('isLoggedIn');
    router.navigate('./');
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Link href={`/signin`} >
        {localStorage.getItem('isLoggedIn') === "true" ?
          localStorage.getItem('username') :
          "Connexion"}
      </Link>
      {localStorage.getItem('isLoggedIn') !== "true" ?
        localStorage.getItem('username') :
        <View>
          <Button title="Nouvelle partie" />

          <Link href={{ pathname: `/player/${playerId}`, params: { id: 3 } }}
            style={{ marginBottom: 4 }}>Profil
          </Link>
          <Link href={`/stats/${playerId}`}>Stats
          </Link>

          <Button
            title="Déconnexion"
            color="#841584"

            onPressIn={() => logout()} />
        </View>
      }
    </View >
  );
}



export default Index