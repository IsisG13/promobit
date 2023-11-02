import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './filme/home';
import Detalhes from './filme/detalhes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detalhes/:movieId" element={<Detalhes />} />
      <Route path="/acao/:movieId" element={<Detalhes />} />
      <Route path="/aventura/:movieId" element={<Detalhes />} />
      <Route path="/animacao/:movieId" element={<Detalhes />} />
      <Route path="/comedia/:movieId" element={<Detalhes />} />
      <Route path="/crime/:movieId" element={<Detalhes />} />
      <Route path="/documentario/:movieId" element={<Detalhes />} />
      <Route path="/drama/:movieId" element={<Detalhes />} />
      <Route path="/familia/:movieId" element={<Detalhes />} />
      <Route path="/fantasia/:movieId" element={<Detalhes />} />
      <Route path="/historia/:movieId" element={<Detalhes />} />
      <Route path="/terror/:movieId" element={<Detalhes />} />
      <Route path="/musica/:movieId" element={<Detalhes />} />
      <Route path="/misterio/:movieId" element={<Detalhes />} />
      <Route path="/romance/:movieId" element={<Detalhes />} />
      <Route path="/ficccao/:movieId" element={<Detalhes />} />
      <Route path="/cinema/:movieId" element={<Detalhes />} />
      <Route path="/thiller/:movieId" element={<Detalhes />} />
      <Route path="/guerra/:movieId" element={<Detalhes />} />
      <Route path="/faroeste/:movieId" element={<Detalhes />} />
    </Routes>
  );
}

export default App;
