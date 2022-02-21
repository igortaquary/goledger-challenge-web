import { createTheme, ThemeProvider } from '@mui/material';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import GlobalStyle from './global-style';
import ArtistForm from './pages/ArtistForm';
import ArtistsPage from './pages/Artists';

import HomePage from './pages/Home';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#d20b56',
    },
    secondary: {
      main: '#ffffff'
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/artist' element={<ArtistsPage/>} />
          <Route path='/artist/form' element={<ArtistForm/>} />
        </Routes> 
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
