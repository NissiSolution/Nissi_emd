import React,{useState,useEffect} from 'react'
import Sidebar from '../../component/Sidebar/Sidebar'
import { IoPerson } from "react-icons/io5";
import { HiStatusOnline } from "react-icons/hi";
import './Dashboard.css'
import welcome from '../../assets/welcome.svg'
import asset1 from '../../assets/asset2.jpg'
import Footer from '../../component/footer/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const navigate=useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [availableDevice,setAvailableDevice]=useState()
const[activeDevice,setActiveDevice]=useState()
  const user=localStorage.getItem('user')
  const role=localStorage.getItem('role');
  const [loading, setLoading] = useState(true);
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
   
   const getActiveDeviceDetails = async (total) => {
   const activeDevices = [];

    try {
  
      // Check if total is defined and is an array
  
      for (let id of total) {

        const data = {
          requestType: "getCurrentData",
          data: JSON.stringify({ deviceId: id }),
        };
  
        const response = await axios.post("https://nissiemd.co.in/mm.php", data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
  
        // Handle response
        if (response.status === 200) {
  
          let res;
          // Check if response.data is a string and try to parse it
          if (typeof response.data === 'string') {
            try {
              res = JSON.parse(response.data);
            } catch (e) {
              console.error("Error parsing response data:", e);
              continue; // Skip this iteration if parsing fails
            }
          } else {
            // If it's not a string, assume it's already an object
            res = response.data;
          }
  // console.log(res);
  
          // Check if res is an object
          if (res) {
            // If it's a single object, convert it to an array
            const items = Array.isArray(res) ? res : [res];
  
            items.forEach(item => {
              // console.log(item);
                if (item?.rs485_status === '1' || item?.lora_status === '1') {
                  // console.log(item);
                  
                  activeDevices.push(item); // Add active device to the array
                }
            });

          } else {
            console.error("Response is not an object:", res);
          }
        }
      }
      setActiveDevice(activeDevices)
  
      // After the loop, you can set the active devices
      // setActiveDevice(activeDevices);
  
    } catch (error) {
      console.error("Error during API call:", error);
    }
    finally {
      setLoading(false); // Stop loading
    }
  };

   useEffect(()=>{

    fetchData()
  
  },[])
   useEffect(() => {
      const total = availableDevice?.map(res => res.deviceId);
      if (total?.length > 0) {
        getActiveDeviceDetails(total);
      }
    }, [availableDevice]);
    const active = availableDevice?.filter(res => {
      // Check if the current deviceId exists in the activeDevice array
      return activeDevice?.some(re => res.deviceId === re.deviceId);
    });
 
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
      <span className='text1'> Welcome Back,</span>  <br/>
      <span className='text2'>{user}</span>  
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
   {/* {role==='admin'&&(
    <>
    <div className="admin-main-content">
      
      
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
   )} */}
<section className="card-section">
  <h3>Active Devices</h3>
  <div className="current-statue-card">
    {loading ? (
      // Show loader while waiting for devices
      <div className="loader">Loading active devices...</div>
    ) : active?.length > 0 ? (
      // Render active devices if available
      active.map((dev) => (
        <div
          key={dev.deviceId}
          className="card active-card"
          onClick={() => {
            window.scrollTo(0, 0)
            navigate(`/devices/${dev.deviceId}`, {
              state: { deviceData: dev },
            });
          }}
        >
          <p>Device Id: {dev.deviceId}</p>
          <p>Device Name: {dev.device_name}</p>
          <p>Device Location: {dev.device_location}</p>
          <div className="active-status">
            <HiStatusOnline className="react-icon" />
          </div>
        </div>
      ))
    ) : (
      // Empty state when no active devices are available
      <div className="empty-state">
        <p>No active devices available.</p>
      </div>
    )}
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