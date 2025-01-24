import React,{useState} from 'react'
import icon from '../../assets/favicon[1]-3.png'
import { NavLink } from 'react-router-dom'
import Burger from '../Nav/Burger'
import { FiLogOut } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'
function Sidebar() {
  const role=localStorage.getItem('role');

      const navigate=useNavigate()
      const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
      const toggleHamburger = () => {
        setHamburgerIsOpen(!hamburgerIsOpen);
      };
      const Logout=()=>{
        localStorage.clear()
         navigate('/')
      }
  return (
    <>
    <div className="sidebar">
        <div className="sidebar-header">
<div className="burger-list" onClick={toggleHamburger}>
          <Burger isOpen={hamburgerIsOpen} />
        </div>
            <img src={icon} alt="icon" className='icon-img'  width='40px' height='40px'/>
           <p>Nissi</p>  
        </div>
         <div className={`side-nav ${hamburgerIsOpen ?'nav-burger':''}`}>
          <div className='links'>

            {role ==='admin'&&(
              <>
              <div>
              <NavLink to='/admin' activeClassName="active" >Admin</NavLink>
  
              </div>
              </>
            )
            }
          <div>
            <NavLink to='/dashboard' activeClassName="active" >Dashboard</NavLink>

            </div>
            <div>
            <NavLink to='/devices' activeClassName="active" >Device</NavLink>

            </div>
            {hamburgerIsOpen&&(<>
              <div className="">
  <NavLink to='/profile'>Profile</NavLink>
</div>
              <div className="">
  <p onClick={()=>{Logout()}}>Logout</p>
</div>

            </>

            )}
          
          </div>

            <section className="logout-section">
            <div className="profile">
             <NavLink to='/profile'><span><FaRegUserCircle /></span>&nbsp;User</NavLink>
            </div>
            <div className="logout" onClick={()=>{Logout()}}>
            <p ><span><FiLogOut /></span> Logout</p>

            </div>
         </section>
           
         </div>
        
    </div>
    </>
  )
}

export default Sidebar