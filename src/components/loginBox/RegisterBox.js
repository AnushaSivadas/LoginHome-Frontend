import React, { useState } from 'react'
import Title from '../Title/Title'
import './LoginBox.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { googleSigninAction, registerAction } from '../../action/AuthActions';


const RegisterBox = ({ setLogin }) => {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        confirmpassword: "",
        username: "",
    });

    const { email, password, username, confirmpassword } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !username || !confirmpassword) {
            handleError('All fields are required')
        }
        else if (!username.match(/^[A-Za-z ]+$/)) {
            handleError("Username can include only alphabets")
        }
        else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            handleError("Invalid email format")

        }
        else if (!password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)) {
            handleError("Password must contain 8-16 letters,a special character,a capital letter")
        }

        else {
            try {
                await registerAction(inputValue, setInputValue);
            } catch (error) {
                console.log(error);
            }
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
        setLogin(true)
    }

    return (
        <>
            <div className='login-box'>
                <div className='login-title'><Title /></div>
                <h2>Register</h2>
                <div className='input-box'>
                    <label htmlFor='username'>&nbsp;Username:</label>
                    <input
                        type='text'
                        name='username'
                        value={username}
                        placeholder='Enter your username'
                        onChange={handleOnChange}
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor=''>&nbsp; &nbsp;Email ID:</label>
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
                        placeholder='Enter the password'
                        onChange={handleOnChange}
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor='confirmpassword'>Confirm Password:</label>
                    <input style={{ marginRight: "40px" }}
                        type='password'
                        name='confirmpassword'
                        value={confirmpassword}
                        placeholder='Re-enter the password'
                        onChange={handleOnChange}
                    />
                </div>


                <button type='submit' onClick={handleSubmit}>Register</button>
                <div className='swap'>Existing User? <span onClick={loginRegisterHandle}><u>Login here</u></span></div>

                <div className='google'>
                    <span className='or'>OR</span>
                    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}>
                        <GoogleLogin
                            onSuccess={(response) => {
                                handleGoogleRegister(response)
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

export default RegisterBox