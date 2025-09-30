import { Link } from "expo-router";
import {  StyleSheet, Text,  View } from "react-native";

import { createClient } from '@supabase/supabase-js'



const Index = () => {
  

  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text style={{ marginBottom: 12 }}>Connexion</Text> */}
      <Link href='/signin' >Me connecter</Link>
      <Link href='/signup'>Créer mon compte</Link>
     
      
    </View>
  );
}



export default Index