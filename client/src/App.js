import './App.css';
import React from 'react';
import Start from './components/navbar/Start';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Site from './components/pages/Site';
import Home from './components/pages/Home'
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Submit from './components/pages/Submit';
import { getLocation, latitude, longitude } from './utils/location';


function App() {
  getLocation();
  return (
  <Router>
  <Start />
  <Routes>
    <Route exact path='/' element={<Home />} />
    <Route path='/site' element={<Site />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/submit' element={<Submit />} />
  </Routes>
  </Router>
  );
}

export default App;
