import { Stack } from "expo-router";
import { GameProvider } from "./contexts/gameContext";
// Ancienne importation sans QueryClient
// import { QueryClientProvider } from "@tanstack/react-query"
// Nouvelle importation avec QueryClient
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Instanciation du QueryClient en dehors du composant pour éviter les recréations
const queryClient = new QueryClient();
export default function RootLayout() {

  return (
    <>
      {/* Ancien Provider sans prop client */}
      {/** <QueryClientProvider> */}
      {/* Nouveau Provider avec prop client */}
      <QueryClientProvider client={queryClient}>
        <GameProvider>
          <Stack
            screenOptions={{
              headerShown: false
            }} />
        </GameProvider>
      </QueryClientProvider>
    </>
  )
}
