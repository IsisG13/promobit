import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './filme/home';
import Detalhes from './filme/detalhes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detalhes/:movieId" element={<Detalhes />} />
    </Routes>
  );
}

export default App;
