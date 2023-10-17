import React, { useState } from 'react'
import './Login.css'
import LoginBox from '../../components/loginBox/LoginBox'
import RegisterBox from '../../components/loginBox/RegisterBox'

const Login = () => {
  const [login, setLogin] = useState(true)
  return (
    <div className='login-page'>
      <div className="square1" style={{ left: "-280px" }} ></div>
      <div className="square1" style={{ right: "-280px" }} ></div>
      <div className="square2" style={{ left: "-500px" }} ></div>
      <div className="square2" style={{ right: "-500px" }} ></div>
      <div className="square3" style={{ left: "-690px" }} ></div>
      <div className="square3" style={{ right: "-690px" }} ></div>
      <div className='login'>

        <div className='top-left'>
          <img className='logo' alt='LOGO' />
        </div>
        <div className='top-right'>
          TAGLINE
        </div>
        <div className='login-part'>
          {login ? <LoginBox  setLogin={setLogin} />
            : <RegisterBox  setLogin={setLogin} />}
        </div>
      </div>
    </div>
  )
}

export default Login