import React, { useContext, useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import Login from './login';
import Signup from './Signup';
import Submit from './Submit';
import Admin from './Admin'; 
import Profile from './Profile'
import { Link } from 'react-router-dom';
import { FIND_ONE_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const Navbar = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  }
  const id = Auth.getProfile();
  
  const { loading, data } = useQuery(FIND_ONE_USER, {
    skip: !Auth.loggedIn(),
    variables: {
      _id: id?.data?._id,
      username: id?.data?.username,
      email: id?.data?.email,
      admin: id?.data?.admin
    }
  });
  
  useEffect(() => {
    if (!loading && data) {
      setIsAdmin(data.findOneUser.admin);
    }
  }, [loading, data]);
  
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">
          <img src='/images/logo.png' className="icon" alt="get outdoors florida" />
        </Link>
        <Link className='nav-link nav-item' to='/'>Get Outdoors Florida</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {Auth.loggedIn() ? (
              <React.Fragment>
                <li className="nav-item">
                  <Link to={`/home`} onClick={logout} className="nav-link active">
                  Logout
                  </Link>
                </li>
                <Submit />
                <Profile />
                {isAdmin && <Admin />}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Signup />
                <Login />
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

