import React from 'react';


const Navbar = () => {

    return (
      <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
      <a className="navbar-brand" href="/home">
        <img src='/images/logo.png' className="icon" alt="" />
      </a>
      <a className='nav-link' href='./'>Get Outdoors Florida</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="./signup">Signup</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="./login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="./logout">Logout</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="./submit">Submit a new location</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
};

export default Navbar;