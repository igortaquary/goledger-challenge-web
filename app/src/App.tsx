import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import GlobalStyle from './global-style';

import HomePage from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path='/' element={<HomePage/>} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
