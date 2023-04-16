import React, {useContext} from 'react';
import { AuthContext } from '../../App';
import Login from './login';
import Logout from './logout';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
    return (
      <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">
          <img src='/images/logo.png' className="icon" alt="" />
        </Link>
        <Link className='nav-link' to='/'>Get Outdoors Florida</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="./signup">Signup</Link>
           </li>
            {isLoggedIn
              ? <Logout /* isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} */ />
              : <Login /* isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} */ />
            }
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="./submit">Submit a new location</Link>
           </li>
          </ul>
        </div>
      </div>
    </nav>
    );
};

export default Navbar;


// adding this for fun