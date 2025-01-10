import React from 'react'
import'./Login.css'
import tech from '../../assets/technology.png'
import left from '../../assets/left.jpg'
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
export default function Login() {
  return (
    <>
    <div className="login-page">
        
        <main className="login-main">
             <div className="main-left"><img src={left} alt="" /></div>
             <div className="main-right">
                <div className='header-img'>
                   <img src={tech} alt="tech" />
                </div>
             <div className="login-container">
    <div className="login-box">
        <h2>Login</h2>
        <form >

            <label htmlFor="email">Email</label>
            <div className='wrapper'>
                <div className="icon">
                <CgProfile />
                </div>
            <input type="email" required id='email' placeholder="Enter the email address" />

            </div>
            <label htmlFor="password">Password</label>
            <div className='wrapper'>
                <div className="icon"> <RiLockPasswordLine />
                </div>
            <input type="password" required id='password' placeholder="Enter the password" />

            </div>
            <div className="forgot-password">
                <p>Forgot Your Password?</p>
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
        </form>
        <div className="signup-link">
        <p>Don't have an account? <Link to='/signup'>SignUp</Link></p>

        </div>

    </div>

             </div>
             </div>
        </main>
    </div>
    </>)
}
