import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import { createClient } from '@supabase/supabase-js'




const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL

const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_API_KEY
//@ts-ignore
const supabase = createClient(supabaseUrl, supabaseKey)


const Signup = () => {
  const [credentials, setCredentials] = useState(
    {
      email: '',
      password: '',
      passwordConfirmation: "",
      username: ""
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
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password, 
        options: {
          data: {
            username: credentials.username,
          }
        }

      });

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
                username: credentials.username,
                email: credentials.email
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