import { createTheme, ThemeProvider } from '@mui/material/styles';
import LandingPage from './page/city-weather';

export const CHOCO_THEME = {
  palette: {
    type: 'light',
    primary: {
      main: '#ffecb3',
      contrastText: '#5a2e20',
    },
    secondary: {
      main: '#997f76',
      contrastText: '#f2fecb3',
    },
    background: {
      default: '#997f76',
      paper: '#ad9890',
      row: '#ad9890',
    },
  },
};

const theme = createTheme(CHOCO_THEME);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
