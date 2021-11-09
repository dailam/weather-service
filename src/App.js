import { createTheme, ThemeProvider } from '@mui/material/styles';
import LandingPage from './page/city-weather';

const THEME = {
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      paper: '#cccccc',
    },
  },
};

const theme = createTheme(THEME);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
