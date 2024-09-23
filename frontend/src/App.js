import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/process/signup" element={<Signup />} />
          <Route path="/process/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
