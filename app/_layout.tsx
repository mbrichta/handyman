import { Slot } from "expo-router";
import { createTheme, ThemeProvider } from "@rneui/themed";
import "../global.css";

const theme = createTheme({
  lightColors: {
    primary: "#E9BE13", // Gold color for primary
    secondary: "#FFFACD", // LemonChiffon for secondary
    background: "#FFFFFF", // White background
  },
  darkColors: {
    primary: "#FFD700", // Gold color for primary
    secondary: "#FFFACD", // LemonChiffon for secondary
    background: "#000000", // Black background
  },
});

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Slot />
    </ThemeProvider>
  );
}
