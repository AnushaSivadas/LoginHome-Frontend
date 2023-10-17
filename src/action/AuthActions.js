import { toast } from 'react-toastify';
import { loginUser, registerUser, googleSigninUser,verifyUserSession } from '../api/AuthRequests';

export const loginAction = async (userData, setUserData, navigate) => {
    try {
        const data = await loginUser(userData);
        const { success, message } = data;
        if (success) {
            toast.success(message, { position: 'bottom-left' });
            setTimeout(() => {
                console.log('Before navigation');
        navigate('/home');
        console.log('After navigation');
            }, 1000);
            setUserData({
                email: "",
                password: "",
            });
        } else {
            toast.error(message, { position: 'bottom-left' });
        }
    } catch (error) {
        console.error('API Error:', error);
    }
};

export const registerAction = async (userData, setUserData) => {
    try {
        const data = await registerUser(userData);
        const { success, message } = data;
        if (success) {
            toast.success(message,{position: 'bottom-left'});
            setUserData({
                email: "",
                password: "",
                confirmpassword: "",
                username: "",
            });
        } else {
            toast.error(message, { position: 'bottom-left' });
        }
    } catch (error) {
        console.error('API Error:', error);
    }
};

export const googleSigninAction = async (credential, navigate) => {
    try {
        const data = await googleSigninUser(credential);
        const { success, message } = data;
        if (success) {
            toast.success(message,{position: 'bottom-left'});
            setTimeout(() => {
                console.log('Before navigation');
        navigate('/home');
        console.log('After navigation');
            }, 1000);
        } else {
            toast.error(message, { position: 'bottom-left' });
        }
    } catch (error) {
        console.error('API Error:', error);
    }
};

export const checkUserSession = async (navigate, setUsername, removeCookie) => {
    try {
      const data = await verifyUserSession();
      const { status, user } = data;
      if (status) {
        setUsername(user);
        toast(`Hello ${user}`, { position: 'top-right' });
      } else {
        removeCookie('token');
        navigate('/');
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };