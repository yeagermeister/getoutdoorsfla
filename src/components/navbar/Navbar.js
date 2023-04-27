import React, { useEffect, useState } from 'react';
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";

const Navbar = () => {

    return (
<>
      {/* {loggedIn ? (
      ) : (
      )} */}
        <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="/home">
          <image src="../images/logo.png" width="50" height="50" alt="" />
        </a>
		<a class='nav-link' href='./home'>Get Outdoors Florida</a>
		<a class='nav-link' href='./signup'>Signup</a>
		<a class='nav-link' href='./login'>Login</a>
		<a class='nav-link' href='./logout'>Logout</a>
		<a class='nav-link' href='./submit'>Submit a new location</a>
      </nav>
      </>
    );
};

export default Navbar;