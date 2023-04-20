import './App.css';
import React, { useState, createContext } from 'react';
import Start from './components/navbar/Start';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import Submit from './components/pages/Submit';
import AdminNewSite from './components/pages/AdminNewSite';

import { BrowserRouter as Router, Routes, Route}from 'react-router-dom';
import { getLocation, latitude, longitude } from './utils/location';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const AuthContext = createContext(false);

function App() {
  getLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  }; 

  return (
    

    <ApolloProvider client={client}>
      <Router>
      <Start />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/AdminNewSite/:id' element={<AdminNewSite />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/submit' element={<Submit />} />
        <Route exact path='/admin' element={<Admin />} />
        
      </Routes>
      </Router>
    </ApolloProvider>

    
  );
}

export default App;
export { AuthContext };
