import React,{useState} from 'react'
import icon from '../../assets/favicon[1]-3.png'
import { NavLink } from 'react-router-dom'
import Burger from '../Nav/Burger'
import { FiLogOut } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import './Sidebar.css'
function Sidebar() {
      const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
      const toggleHamburger = () => {
        setHamburgerIsOpen(!hamburgerIsOpen);
      };
  return (
    <>
    <div className="sidebar">
        <div className="sidebar-header">
<div className="burger-list" onClick={toggleHamburger}>
          <Burger isOpen={hamburgerIsOpen} />
        </div>
            <img src={icon} alt="icon" className='icon-img'  width='40px' height='40px'/>
           <p>NissiRnD</p>  
        </div>
         <div className={`side-nav ${hamburgerIsOpen ?'nav-burger':''}`}>
          <div className='links'>
          <div>
            <NavLink to='/dashboard' activeClassName="active" >Dashboard</NavLink>

            </div>
            <div>
            <NavLink to='/devices' activeClassName="active" >Device</NavLink>

            </div>
            {hamburgerIsOpen&&(<>
              <div className="">
  <NavLink to='/user'>Profile</NavLink>
</div>
              <div className="">
  <p>Logout</p>
</div>

            </>

            )}
          
          </div>

            <section className="logout-section">
            <div className="profile">
             <NavLink to='/user'><span><FaRegUserCircle /></span>&nbsp;User</NavLink>
            </div>
            <div className="logout">
            <p ><span><FiLogOut /></span> Logout</p>

            </div>
         </section>
           
         </div>
        
    </div>
    </>
  )
}

export default Sidebar