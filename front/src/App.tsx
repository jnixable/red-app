import PriceViewer from "./PriceViewer";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme>
          <PriceViewer />
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
