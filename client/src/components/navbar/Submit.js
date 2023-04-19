import React from 'react';
import { Link } from 'react-router-dom';

const Submit = () => {
    return (
        <>
            <li className="nav-item">
              <Link to={`/Submit`} className="nav-link active"><a className="nav-link active" aria-current="page" href="./Submit">Submit a new site!</a></Link>
            </li>
        </>
    )
};

export default Submit;