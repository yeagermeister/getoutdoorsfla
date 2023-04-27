import './App.css';
import React from 'react';
import Start from './components/navbar/Start';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Spring from './components/pages/Site';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Submit from './components/pages/Submit';
import { getLocation, latitude, longitude } from './utils/utils';


function App() {
  getLocation();
  return (
  <Router>
  <Start />
  <Routes>
    <Route exact path='/' element={<Start />} />
    <Route path='/spring' element={<Spring />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/submit' element={<Submit />} />
  </Routes>
  </Router>
  );
}

export default App;
