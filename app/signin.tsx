import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import { createClient } from '@supabase/supabase-js'
import { withClamp } from "react-native-reanimated";
import axios from "axios";
import { log } from "node:console";


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL

const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_API_KEY
//@ts-ignore
const supabase = createClient(supabaseUrl, supabaseKey)


const Signin = () => {
  const [login, setLogin] = useState(
    {
      email: '',
      password: ''
    }
  );



  const handleLogin = async () => {
    console.log('coucou');
    if (!login.password || !login.email) {
      Alert.alert("Champs requis", "Veuillez renseigner votre email et mot de passe.");
      return;
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: login.email,
        password: login.password,
      });
      console.log(data);

      if (error) {
        // Gérer les erreurs de Supabase (email déjà utilisé, mot de passe trop faible, etc.)
        console.log('Erreur d\'inscription Supabase:', error);
        Alert.alert("Erreur d'inscription", error.message);
        return;
      }
      if (data.user) {

        if (data.user) {
          const creteUsersInUsersTable = await supabase
            .from('users')
            .insert([
              {
                id: data.user.id,
                username: login.username,
                email: login.email
              },
            ]);

          console.log(creteUsersInUsersTable);
        }

        console.log('Inscription réussie. Utilisateur créé:', data.user);
        Alert.alert("Succès", "Compte créé! Vérifiez votre email pour la confirmation.");
      } else if (data.session === null && data.user === null) {
        Alert.alert("Confirmation requise", "Un lien de confirmation a été envoyé à votre adresse email.");
      }

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
      <View style={{ width: 240, marginBottom: 16 }}>
        <Button title="Se connecter" onPress={handleLogin} />
      </View>
      <Link href={{ pathname: '/user/[id]', params: { id: 3 } }}
        style={{ marginBottom: 4 }}>Profil</Link>
      <Link href="/stats">Stats</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red'
  }
});

export default Signin