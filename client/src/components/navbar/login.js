import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <li className="nav-item">
            <Link to={`/login`} className="nav-link active">Login</Link>
            </li>
        </>
    )
};

export default Login;