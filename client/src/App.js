import './App.css';
import React from 'react';
import Start from './components/navbar/Start';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Site from './components/pages/Site';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import Submit from './components/pages/Submit';

import { BrowserRouter as Router, Routes, Route}from 'react-router-dom';
import { getLocation, latitude, longitude } from './utils/location';

const isLoggedIn = this.state.isLoggedIn;

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
    <Route path='/admin' element={<Admin />} />
  </Routes>
  </Router>
  );
}

export default App;
