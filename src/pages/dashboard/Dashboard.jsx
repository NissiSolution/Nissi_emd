import React,{useState} from 'react'
import Sidebar from '../../component/Sidebar/Sidebar'
import { IoPerson } from "react-icons/io5";
import './Dashboard.css'
import welcome from '../../assets/welcome.svg'
import asset1 from '../../assets/asset2.jpg'
import Footer from '../../component/footer/Footer';
function Dashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
  <>
  <div className="dashboard">
    <div className='dashboard-sidebar'>
    <Sidebar/>

    </div>
    <div className="dashboard-main">
     <div className="dashboard-header">
      <div>
      <img src={welcome} alt="Welcome" />
      <h2>
        Welcome Back, <br/>
        User
      </h2>
      </div>
     
      {/* <div className="profile-icon">
    <IoPerson />
<p  className="company-dropdown" onClick={() => setIsProfileOpen(!isProfileOpen)}>User {isProfileOpen?'△':'▽'}</p>
    </div> */}
    {isProfileOpen && (
                <ul className="dropdown-menu">
                  <li  className="dropdown-item">
                    {/* <FontAwesomeIcon icon={faUserCircle} /> Profile */}
                    Profile
                  </li>
                  <li className="dropdown-item">
                    {/* <FontAwesomeIcon icon={faPowerOff} /> Logout */}
                    Logout
                  </li>
                </ul>
              )}
     </div>
   <section className="main-content">
    <div className="section-img">
      <figure>
        <img src={asset1} alt="EMD" width={'500px'}  height={'500px '}/>
      </figure>
    </div>
<section className='card-section'>
<h3>Active Devices</h3>
    <div className="current-statue-card">
       <div className="card">
        <p>Device Id:</p>
        <p>Device Name:</p>
        <p>Device Location:</p>
       </div>
       <div className="card">
        <p>Device Id:</p>
        <p>Device Name:</p>
        <p>Device Location:</p>
       </div>
       <div className="card">
        <p>Device Id:</p>
        <p>Device Name:</p>
        <p>Device Location:</p>
       </div>
       <div className="card">
        <p>Device Id:</p>
        <p>Device Name:</p>
        <p>Device Location:</p>
       </div>
       
      
    </div>
    <div className="available-card">
    <h3>Available Devices</h3>
    <div className="available-cards">
<div className="card">
        <p>Device Id:</p>
        <p>Device Name:</p>
        <p>Device Location:</p>
       </div>
<div className="card">
        <p>Device Id:</p>
        <p>Device Name:</p>
        <p>Device Location:</p>
       </div>
<div className="card">
        <p>Device Id:</p>
        <p>Device Name:</p>
        <p>Device Location:</p>
       </div>
  <div className="card">
          <p>Device Id:</p>
          <p>Device Name:</p>
          <p>Device Location:</p>
        </div>
    </div>
    
    </div>
</section>

   </section>
    </div>
    <div className="dashboard-footer">
  <Footer/>
 </div>
  </div>
  
  </>
)
}

export default Dashboard