import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <>
            <li className="nav-item">
            <Link to={`/Signup`} className="nav-link active"><a className="nav-link active" aria-current="page" href="./Signup">Signup</a></Link>
            </li>
        </>
    )
};

export default Signup;