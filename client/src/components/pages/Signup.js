import '../../form.css';
import saveData from '../../utils/saveData';

const Signup = () => {

    function handleSubmit(data){

    };
    return (
        <>
            <h2>Sign Up!</h2>
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
