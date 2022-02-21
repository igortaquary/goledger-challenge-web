import { createTheme, ThemeProvider } from '@mui/material';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import GlobalStyle from './global-style';

import HomePage from './pages/Home';
import ArtistForm from './pages/ArtistForm';
import ArtistsPage from './pages/Artists';
import StreamingPage from './pages/Streaming';
import StreamingForm from './pages/StreamingForm';
import AlbumsPage from './pages/Albums';
import AlbumForm from './pages/AlbumForm';

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
          <Route path='/streaming' element={<StreamingPage/>} />
          <Route path='/streaming/form' element={<StreamingForm/>} />
          <Route path='/album' element={<AlbumsPage/>} />
          <Route path='/album/form' element={<AlbumForm/>} />
        </Routes> 
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
