import React from 'react'
import './AdminDashboard.css'
import welcome from '../../assets/welcome.svg'
import Sidebar from '../../component/Sidebar/Sidebar'
import Footer from '../../component/footer/Footer'
import { RiUserSettingsFill } from "react-icons/ri";
import { TfiDashboard } from "react-icons/tfi";
import { TbDeviceAnalytics } from "react-icons/tb";
import { TiUserAdd } from "react-icons/ti";
import { useNavigate } from 'react-router-dom'
export default function AdminDashboard() {
  const navigate=useNavigate()
  return (
    <>
    <div className="admin-dashboard-page">
     <div className="admin-dashboard-sidebar">
      <Sidebar/>

     </div>
     <div className="admin-dashboard-main">

      <div className="dashboard-header">
       <div>
             <img src={welcome} alt="Welcome" />
             <h2>
               Welcome Back, <br/>
               Admin
             </h2>
             </div>
      </div>
      <div className="admin-main">
        <div className="admin-box">
          <div className="admin-card" onClick={()=>navigate('/dashboard')} >
            
          <TfiDashboard  className='react-icon' />
            <h3>Dashboard</h3>
            <p>Insight about device  </p>
          </div>
          <div className="admin-card" onClick={()=>navigate('/users')}>
          <RiUserSettingsFill className='react-icon' />
            <h3>Users</h3>
            <p>Manage People</p>
          </div>
          <div className="admin-card" onClick={()=>navigate('/devices')}>
          <TbDeviceAnalytics className='react-icon' />
            <h3>Devices</h3>
            <p>Devices details</p>
          </div>
          <div className="admin-card" onClick={()=>navigate('/users')}>
          <TiUserAdd className='react-icon'  />
            <h3>Add User</h3>
            <p>Add New user</p>
          </div>
        </div>
      </div>
     </div>
     <div className="admin-dashboard-footer">
      <Footer/>
     </div>
    </div>
    </>
  )
}
