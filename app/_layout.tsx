import { Stack } from "expo-router/stack";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login/index" options={{ headerShown: false }} />
    </Stack>
  );
}
