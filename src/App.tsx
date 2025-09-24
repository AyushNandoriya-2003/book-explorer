// Third party Imports
import { BrowserRouter as Router } from "react-router-dom";

// Custom Components Imports
import Navbar from "./Layout/Navbar";
import AppRoutes from "./Routes/Routes";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./Store/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Container sx={{ py: 2, height: '100%', width: '100%' }}>
          <AppRoutes />
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
