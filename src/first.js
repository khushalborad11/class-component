import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function First(params) {
    const navigate = useNavigate();

    const Submit = () => {

        navigate('/dashboard');
    };
    return (
        <div><form >
            <h1>Login</h1>
            <label>Email Here: </label><input type='email' name='email' placeholder="decode@softtech.com"></input><br></br>
            <label>Password Here : </label><input type='password' name='password' ></input><br></br>
            <button onClick={Submit}>Submit</button>
        </form>
        </div>
    )
}