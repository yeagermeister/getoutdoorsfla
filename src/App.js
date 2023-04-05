import './App.css';
import React from 'react';
import Start from './navbar/Start';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Spring from './components/pages/Spring';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';


function App() {
  return (
  <Router>
  <Start />
  <Routes>
    <Route exact path='/' element={<Start />} />
    <Route path='/spring' element={<Spring/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/signup' element={<Signup/>} />
  </Routes>
  </Router>
  );
}

export default App;
