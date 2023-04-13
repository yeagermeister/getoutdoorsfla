import './App.css';
import React from 'react';
import Start from './components/navbar/Start';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Site from './components/pages/Site';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import Submit from './components/pages/Submit';
import Mongo from './components/pages/testmongo';

import { BrowserRouter as Router, Routes, Route}from 'react-router-dom';
import { getLocation, latitude, longitude } from './utils/location';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// const isLoggedIn = this.state.isLoggedIn;

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



function App() {
  getLocation();
  return (
    <ApolloProvider client={client}>
      <Router>
      <Start />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/mongo' element={<Mongo />} />
        <Route path='/site' element={<Site />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/submit' element={<Submit />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
