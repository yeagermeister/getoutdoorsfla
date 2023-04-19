import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <li className="nav-item">
            <Link to={`/login`} className="nav-link active"><a className="nav-link active" aria-current="page" href="./login">Login</a></Link>
            </li>
        </>
    )
};

export default Login;