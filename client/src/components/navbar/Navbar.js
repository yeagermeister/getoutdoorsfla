import React, { useContext, useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import Login from './login';
import Signup from './Signup';
import Submit from './Submit';
import Admin from './Admin'; 
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
  console.log(id);

  const { loading, data } = useQuery(FIND_ONE_USER, {
    variables: { _id: id.data._id, username: id.data.username, email: id.data.email, admin: id.data.admin },
    skip: !id.data._id
  });

  useEffect(() => {
    if (!loading && data) {
      setIsAdmin(data.findOneUser.admin);
    }
  }, [loading, data]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* ... */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {Auth.loggedIn() ? (
              <React.Fragment>
                <li className="nav-item">
                  <Link to={`/home`} className="nav-link active">
                    <p className="nav-link active" aria-current="page" onClick={logout}>Logout</p>
                  </Link>
                </li>
                <Submit />
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

