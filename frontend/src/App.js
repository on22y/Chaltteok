import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Voice from './components/Voice';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Voice />} />
      </Routes>
    </Router>
  );
}

export default App;
