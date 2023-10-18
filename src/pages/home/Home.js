import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { ToastContainer } from 'react-toastify';
import { checkUserSession } from '../../action/AuthActions';

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('profile');
      if (!storedToken) {
        navigate('/');
        return;
      }
      await checkUserSession(navigate, setUsername, storedToken);
    };

    verifyUser();
  }, [navigate]);

  const Logout = () => {
    localStorage.removeItem('profile');
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
