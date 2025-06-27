// import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/dashboard';
import Morbiditas from './components/pages/morbiditas';
import PenyakitTerbanyak from './components/pages/PenyakitTerbanyak';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/morbiditas" element={<Morbiditas />} />
        <Route path="/10penyakitterbanyak" element={<PenyakitTerbanyak />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
