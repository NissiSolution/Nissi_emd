import React from 'react';
import './Signup.css';
import tech from '../../assets/technology.png';
import left from '../../assets/left.jpg';
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEmail, MdPhone, MdWork, MdBusiness } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <>
      <div className="signup-page">
        <main className="signup-main">
          <div className="main-left">
            <img src={left} alt="Left Visual" />
          </div>
          <div className="main-right">
            <div className="header-img">
              <img src={tech} alt="Technology Icon" />
            </div>
            <div className="signup-container">
              <div className="signup-box">
                <h2>Signup</h2>
                <form>
                  <label htmlFor="email">Email</label>
                  <div className="wrapper">
                    <div className="icon">
                      <MdEmail />
                    </div>
                    <input type="email" id="email" placeholder="Enter the email address" required />
                  </div>

                  <label htmlFor="password">Password</label>
                  <div className="wrapper">
                    <div className="icon">
                      <RiLockPasswordLine />
                    </div>
                    <input type="password" id="password"  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Enter the password" required />
                  </div>

                  <label htmlFor="username">Username</label>
                  <div className="wrapper">
                    <div className="icon">
                      <CgProfile />
                    </div>
                    <input type="text" id="username" placeholder="Enter the username" required />
                  </div>

                  <label htmlFor="phone">Phone Number</label>
                  <div className="wrapper">
                    <div className="icon">
                      <MdPhone />
                    </div>
                    <input type="tel" id="phone" placeholder="Enter the phone number"  required />
                  </div>

                  <label htmlFor="designation">Designation</label>
                  <div className="wrapper">
                    <div className="icon">
                      <MdWork />
                    </div>
                    <input type="text" id="designation" placeholder="Enter the designation" required />
                  </div>

                  <label htmlFor="company">Company Name</label>
                  <div className="wrapper">
                    <div className="icon">
                      <MdBusiness />
                    </div>
                    <input type="text" id="company" placeholder="Enter the company name" required />
                  </div>

                  <button type="submit" className="signup-button">Update</button>
                </form>
                <div className="login-link">
                  <p>Already Registered? <Link to="/">Login</Link></p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
