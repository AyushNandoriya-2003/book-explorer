// Third party Imports
import { BrowserRouter as Router } from "react-router-dom";

// Custom Components Imports
import Navbar from "./Layout/Navbar";
import AppRoutes from "./Routes/Routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./Store/store";

// Styles Imports
import './index.css'

const theme = createTheme({
  typography: { fontFamily: 'Lexend' },
  shape: { borderRadius: 8 }
});

const App = () => {


  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
