import React, {useContext} from 'react';
import Auth from '../../utils/auth'
import Login from './login';
import Signup from './Signup';
import Submit from './Submit';
import Admin from './Admin'; 
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const logout = (e) => {
    e.preventDefault();
  Auth.logout()
  }

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
            {Auth.loggedIn ()
              ? (<React.Fragment>
                <li className="nav-item">
                <Link to={`/home`} className="nav-link active"><p className="nav-link active" aria-current="page" onClick={logout}>Logout</p></Link>
                </li>
              <Submit />
              <Admin />
              </React.Fragment>
              )
              : (<React.Fragment>
                 <Signup />
                <Login />
                </React.Fragment>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
    );
};

export default Navbar;


// adding this for fun