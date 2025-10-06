import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGameContext } from "./contexts/gameContext";
import axios from "axios";

const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL

const Signin = () => {
  const { player, setPlayer } = useGameContext();
  const [login, setLogin] = useState(
    {
      email: 'test@test.fr',
      password: 'test'
    }
  );
  

  const handleLogin = async () => {

    if (!login.password || !login.email) {
      Alert.alert("Champs requis", "Veuillez renseigner votre email et mot de passe.");
      return;
    }
    try {
      
      const response = await axios.post(`${baseAPIURL}/player/login`,
        {
          email: login.email,
          password: login.password,
        }

      )
      const fullPlayerObject = {
        id: response.data.player.id,
        username: response.data.player.username,
        email: response.data.email,
        isLoggedIn: true,
      };

      setPlayer(fullPlayerObject);

      await AsyncStorage.setItem('playerId', fullPlayerObject.id);
      await AsyncStorage.setItem('username', fullPlayerObject.username);
      await AsyncStorage.setItem('email', fullPlayerObject.email);
      await AsyncStorage.setItem('isLoggedIn', "true");

      router.navigate('./');
    } catch (error) {
      console.log("Erreur inattendue:", error);
      Alert.alert("Erreur", "Une erreur inattendue est survenue.");
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
      <Text style={{ marginBottom: 12 }}>Connexion</Text>
      <TextInput
        placeholder="Email"
        value={login.email}

        onChangeText={(text) => setLogin({
          ...login,
          email: text
        })}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          width: 240,
          height: 44,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 6,
          paddingHorizontal: 12,
          marginBottom: 8,
        }}
      />
      <TextInput
        placeholder="Mot de passe"
        value={login.password}
        onChangeText={(text) => setLogin({
          ...login,
          password: text
        })}
        secureTextEntry
        style={{
          width: 240,
          height: 44,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 6,
          paddingHorizontal: 12,
          marginBottom: 12,
        }}
      />

      <Link href="/signup">Créer un compte?</Link>
      <Link href="/forgotPassword">Mot de passe oublié?</Link>

      <View style={{ width: 240, marginBottom: 16 }}>
        <Button title="Se connecter" onPress={handleLogin} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red'
  }
});

export default Signin