import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";



export const logout = async (setPlayer: React.SetStateAction<any>) => {
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


