import React from "react";
import saveData from '../../utils/saveData';

function handleSubmit(data){

};

const Login = () => {
    return (
        <div>
            <h2>Login Placeholder</h2>
            <form onSubmit={handleSubmit(data => saveData(data))}>
                <label>Username:</label>
                <input className="spacing" name="username"/>
                <label>Password:</label>
                <input className="spacing" name="password" />
                <input type="submit" className="myButton" />
            </form>
        </div>
    )
}

export default Login;
