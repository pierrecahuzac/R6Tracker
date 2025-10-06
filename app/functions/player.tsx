import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";



export const logout = async (setPlayer) => {
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


