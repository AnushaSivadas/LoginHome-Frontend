import React, { useState } from 'react'
import Title from '../Title/Title'
import './LoginBox.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { loginAction ,googleSigninAction} from '../../action/AuthActions';


const LoginBox = ({ setLogin }) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });

    const { email, password } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginAction(inputValue,setInputValue, navigate)

        } catch (error) {
            console.log(error);
        }

    };
    const handleGoogleRegister = async (response) => {
        try {
            await googleSigninAction(response, navigate);
        } catch (error) {
            console.log(error);
        }
    }

    const loginRegisterHandle = () => {
        setLogin(false)
    }

    return (
        <>
            <div className='login-box'>
                <div className='login-title'><Title /></div>
                <h2>Login</h2>
                <div className='input-box'>
                    <label htmlFor='email'>&nbsp; &nbsp;Email ID:</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        placeholder='Enter your email'
                        onChange={handleOnChange}
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor='password'>Password: </label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        placeholder='Enter your password'
                        onChange={handleOnChange}
                    />
                </div>

                {/* <div className='forgot'>Forgot User ID/PassCode</div> */}

                <button type='submit' onClick={handleSubmit}>Login</button>
                <div className='swap'>New User? <span onClick={loginRegisterHandle}><u>Register here</u></span></div>
                <div className='google'>
                    <span className='or'>OR</span>
                    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}>
                        <GoogleLogin
                            onSuccess={(response) => {
                               handleGoogleRegister(response);

                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }} />
                    </GoogleOAuthProvider>

                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default LoginBox