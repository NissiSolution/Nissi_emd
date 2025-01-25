import React, { useState } from 'react';
import icon from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import Burger from '../Nav/Burger';
import { FiLogOut } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

  // Function to toggle the hamburger menu
  const toggleHamburger = () => {
    setHamburgerIsOpen(!hamburgerIsOpen);
  };

  // Logout function
  const Logout = () => {
    localStorage.clear(); // Clear all stored items
    navigate('/'); // Navigate back to the login page
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="burger-list" onClick={toggleHamburger}>
            <Burger isOpen={hamburgerIsOpen} />
          </div>
          <img src={icon} alt="icon" className='icon-img' />
          <p>Nissi</p>
        </div>
        <div className={`side-nav ${hamburgerIsOpen ? 'nav-burger' : ''}`}>
          <div className='links'>
            {role === 'admin' && (
              <>
                <div>
                  <NavLink to="/main" activeClassName="active">Admin</NavLink>
                </div>
              </>
            )}
            <div>
              <NavLink to='/dashboard' activeClassName="active">Dashboard</NavLink>
            </div>
            <div>
              <NavLink to='/devices' activeClassName="active">Device</NavLink>
            </div>
            {hamburgerIsOpen && (
              <>
                <div className="">
                  <NavLink to='/profile'>Profile</NavLink>
                </div>
                <div className="">
                  <p onClick={Logout}>Logout</p>
                </div>
              </>
            )}
          </div>
          <section className="logout-section">
            <div className="profile">
              <NavLink to='/profile'><span><FaRegUserCircle /></span>&nbsp;User</NavLink>
            </div>
            <div className="logout" onClick={Logout}>
              <p><span><FiLogOut /></span> Logout</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
