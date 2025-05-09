import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: "fade", 
        animationDuration: 500,
      }}
    />
  );
}
