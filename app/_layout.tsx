import { Stack } from "expo-router";
import { GameProvider } from "./contexts/gameContext";
// Ancienne importation sans QueryClient
// import { QueryClientProvider } from "@tanstack/react-query"
// Nouvelle importation avec QueryClient
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
// Instanciation du QueryClient en dehors du composant pour éviter les recréations
const queryClient = new QueryClient();
export default function RootLayout() {

  return (
    <>
  
      <QueryClientProvider client={queryClient}>
        <GameProvider>
          <Stack
            screenOptions={{
              headerShown: false
            }} />
            <Toast/>
        </GameProvider>
      </QueryClientProvider>
    </>
  )
}
