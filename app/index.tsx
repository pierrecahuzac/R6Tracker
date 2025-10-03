// import { Button } from "@react-navigation/elements";

// import { Link, router } from "expo-router";

// import { View } from "react-native";


// import { useGameContext } from "./contexts/gameContext";



// const Index = () => {
//   const { mapChoosen, setMapChoosen, player, setPlayer } = useGameContext()
//   console.log(player);

//   const playerId =player.id;

//   const logout = () => {
//     setPlayer({
//       id: '',
//       username: '',
//       email: ''
//     })
//     console.log(('je tente de déco'));
//     localStorage.removeItem('playerId');
//     localStorage.removeItem('username');
//     localStorage.removeItem('email');
//     localStorage.removeItem('isLoggedIn');
//     router.navigate('./');
//   }
//   return ( 

//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >

//         <Link href={`/signin`} >
//           {localStorage.getItem('isLoggedIn') === "true" ?
//             localStorage.getItem('username') :
//             "Connexion"}
//         </Link>
//         {localStorage.getItem('isLoggedIn') !== "true" ?
//           localStorage.getItem('username') :
//           <View>
//             <Button title="Nouvelle partie" />

//             <Link href={{ pathname: `/player/${playerId}`, params: { id: 3 } }}
//               style={{ marginBottom: 4 }}>Profil
//             </Link>
//             <Link href={`/stats/${playerId}`}>Stats
//             </Link>

//             <Button
//               //type="action"
//               title="Déconnexion"
//               color="#841584"

//               onPressIn={() => logout()} />
//             <Link href={`/newGame`}>Nouvelle partie
//             </Link>
//           </View>
//         }
//       </View >

//   );
// }



// export default Index// Index.tsx

import { Link, router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGameContext } from "./contexts/gameContext";
import { Button, View } from "react-native";
import { useEffect } from "react";
import axios from "axios";



const Index = () => {

  const { player, setPlayer } = useGameContext();  

  const logout = async () => {
    setPlayer({
      id: '',
      username: '',
      email: ''
    });

    try {
      await AsyncStorage.multiRemove(['playerId', 'username', 'email', 'isLoggedIn']);
    } catch (e) {
      console.error("Erreur AsyncStorage:", e);
    }
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
      {player && player.isLoggedIn === true ?
        (

          <View style={{ alignItems: "center" }}>
            <Link href={`/player/${player.id}`} style={{ marginBottom: 20 }}>
              Bienvenue, {player.username}
            </Link>

            <Button title="Nouvelle partie" />


            <Link href={{ pathname: `/player/[id]`, params: { id: player.id } }}
              style={{ marginBottom: 4 }}>Profil
            </Link>
            <Link href={`/stats/${player.id}`} style={{ marginBottom: 20 }}>Stats</Link>

            <Button
              title="Déconnexion"
              color="#841584"
              onPress={logout}
            />
            {/*  Créer une nouvelle game dans la DB */}
            <Link href={`/newGame`} style={{ marginTop: 20 }}>Nouvelle partie</Link>
          </View>
        ) : (

          <Link href={`/signin`} >
            Connexion
          </Link>
        )}
    </View >
  );
}

export default Index