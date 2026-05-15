// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Gallery from './components/Gallery';
import './Home.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="app-header">
          <h1>Snap Shot Gallery</h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery/:query" element={<Gallery />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;