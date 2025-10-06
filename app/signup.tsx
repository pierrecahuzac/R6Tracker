import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

//import { createClient } from '@supabase/supabase-js'
import { Link } from "expo-router";
import axios from "axios";


const baseAPIURL = process.env.EXPO_PUBLIC_BASE_API_URL


const Signup = () => {
  const [credentials, setCredentials] = useState(
    {
      email: 'test@test.fr',
      username: "test",
      password: 'test',
      passwordConfirmation: "test",
    }
  );

  const handleSubmitAccount = async () => {
    // 1. Vérification de la confirmation du mot de passe
    if (credentials.password !== credentials.passwordConfirmation) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    if (!credentials.email || !credentials.password || !credentials.passwordConfirmation || !credentials.username) {
      Alert.alert("Champs requis", "Veuillez renseigner votre email et mot de passe.");
      return;
    }

    try {
      const response = await axios.post(`${baseAPIURL}/player/signup`, {
        email: credentials.email,
        password: credentials.password,
        username: credentials.username

      }, {
        //withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });


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
      <Text style={{ marginBottom: 12 }}>Créer mon compte</Text>
      <TextInput
        placeholder="Email"
        value={credentials.email}

        onChangeText={(text) => setCredentials({
          ...credentials,
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
        placeholder="Nom d'utilisateur"
        value={credentials.username}

        onChangeText={(text) => setCredentials({
          ...credentials,
          username: text
        })}
        autoCapitalize="none"
        keyboardType="default"
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
        value={credentials.password}
        onChangeText={(text) => setCredentials({
          ...credentials,
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
      <TextInput
        placeholder="Confimation du mot de passe"
        value={credentials.passwordConfirmation}
        onChangeText={(text) => setCredentials({
          ...credentials,
          passwordConfirmation: text
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
      <Link href="/signin">J'ai un compte</Link>
      <View style={{ width: 240, marginBottom: 16 }}>
        <Button title="Créer mon compte" onPress={handleSubmitAccount} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red'
  }
});

export default Signup