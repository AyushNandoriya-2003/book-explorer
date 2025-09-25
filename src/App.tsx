// Third party Imports
import { BrowserRouter as Router } from "react-router-dom";

// Custom Components Imports
import Navbar from "./Layout/Navbar";
import AppRoutes from "./Routes/Routes";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./Store/store";

// Styles Imports
import './index.css'

const App = () => {

  const theme = createTheme({
    typography: {
      fontFamily: 'Lexend',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Container sx={{ py: 2, height: '100%', width: '100%' }}>
            <AppRoutes />
          </Container>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
