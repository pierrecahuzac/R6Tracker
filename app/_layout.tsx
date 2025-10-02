import { Stack } from "expo-router";
import { GameProvider } from "./contexts/gameContext";

export default function RootLayout() {

  return (
    <GameProvider>
      <Stack

        screenOptions={{
          headerShown: false
        }} />
    </GameProvider>)
}
