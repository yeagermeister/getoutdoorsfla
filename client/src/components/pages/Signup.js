import '../../form.css';
import saveData from '../../utils/saveData';

const Signup = () => {

    function handleSubmit(data){

    };
    return (
        <>
            <h1>Sign Up!</h1>
            <form onSubmit={handleSubmit(data => saveData(data))}>
                <label>Username:</label>
                <input className="spacing" name="username"/>
                <label>Password:</label>
                <input className="spacing" name="password" />
                <input type="submit" className="myButton" />
            </form>
        </>
    );
};

export default Signup;
