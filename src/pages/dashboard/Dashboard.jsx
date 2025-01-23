import React,{useState,useEffect} from 'react'
import Sidebar from '../../component/Sidebar/Sidebar'
import { IoPerson } from "react-icons/io5";
import './Dashboard.css'
import welcome from '../../assets/welcome.svg'
import asset1 from '../../assets/asset2.jpg'
import Footer from '../../component/footer/Footer';
import axios from 'axios';
function Dashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [availableDevice,setAvailableDevice]=useState()

  const role=localStorage.getItem('role');
  
  const userid=localStorage.getItem('userId')

  
  //  console.log(availableDevice);
  const fetchData= async()=>{
    const data={
        requestType:'getAvailableDevices',
        data: JSON.stringify({ userId:userid}),
    }
    try{

        const response = await axios.post("https://nissiemd.co.in/mm.php", data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
         
          if (response.data) {
           setAvailableDevice(response.data)
          } else {
            
           
            }
        }catch(error){
        console.error(error);
        
        }

   }
   useEffect(()=>{

    fetchData()
  
  },[])
  console.log(availableDevice);
 
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
   {role!=='admin'&&(

<div className="section-img">
<figure>
  <img src={asset1} alt="EMD" width={'500px'}  height={'500px '}/>
</figure>
</div>
   )}
   {role==='admin'&&(
    <>
    <div className="admin-main-content">
      
      <div className="admin-card1">
        <h3>Total Users</h3>
         <p>2</p>
      </div>
      <div className="admin-card1">
        <h3>Total Devices</h3>
        <p>2</p>
      </div>
      <div className="admin-card1">
        <h3>Total Active Devices </h3>
        <p>0</p>
      </div>

    </div>
    </>
   )}
<section className='card-section'>
<h3>Active Devices</h3>
    <div className="current-statue-card">
       <div className="card">
        <p>Device Id:</p>
        <p>Device Name:</p>
        <p>Device Location:</p>
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