import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeDark, themeLight } from "assets";
import { useContextController } from "context";
import Routing from "./pages/Routing";
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}
export const App = () => {
  const [{ darkMode }] = useContextController();
  return (
    <ThemeProvider theme={darkMode ? themeLight : themeDark}>
      <CssBaseline enableColorScheme />
      <Routing />
    </ThemeProvider>
  );
};

export default App;
