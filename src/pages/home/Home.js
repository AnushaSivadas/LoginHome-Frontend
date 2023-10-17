import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Home.css';
import { ToastContainer } from 'react-toastify';
import { checkUserSession } from '../../action/AuthActions';

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.token) {
        navigate('/');
        return;
      }
      await checkUserSession(navigate, setUsername, removeCookie);
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie('token');
    navigate('/');
  };

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      
      <ToastContainer />
    </>
  );
};

export default Home;
