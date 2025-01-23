import React,{useState,useEffect} from "react";
import "./Device.css";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import Sidebar from "../../component/Sidebar/Sidebar";
import Footer from "../../component/footer/Footer";
import emd from "../../assets/asset4.png";
export default function Device() {
  const [availableDevice,setAvailableDevice]=useState()
  const navigate=useNavigate()
  const role = localStorage.getItem('role');
  const userid=localStorage.getItem('userId')
  const [addDeviceOpen,setAddDeviceOpen]=useState(false)
  const[activeDevice,setActiveDevice]=useState()
  let total=availableDevice?.map(res=>res.deviceId)
 
  
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
            // console.log(response.data);
            
           setAvailableDevice(response.data)
          } else {
            
           
            }
        }catch(error){
        console.error(error);
        
        }

   }
   const activeDevices = [];
   
   const getActiveDeviceDetails = async () => {
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
                if (item.rs485_status === '1' || item.lora_status === '1') {
                  // console.log(item);
                  
                  activeDevices.push(item); // Add active device to the array
                }
              setActiveDevice(activeDevices)
            });
          } else {
            console.error("Response is not an object:", res);
          }
        }
      }
  
      // After the loop, you can set the active devices
      // setActiveDevice(activeDevices);
  
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  const active = availableDevice?.filter(res => {
    // Check if the current deviceId exists in the activeDevice array
    return activeDevice.some(re => res.deviceId === re.deviceId);
  });
  
   useEffect(()=>{

    fetchData()
    getActiveDeviceDetails()
  
  },[])
  return (
    <>
        <div className="device-page">
          <div className="device-sidebar">
            <Sidebar />
          </div>
          <div className="device-main">
            {/* <h2>Devices</h2> */}

            <div className="device-info">
              <div className="device-lead">
                <h3>Energy Monitoring Device</h3>
                <button className="btn" onClick={()=>{setAddDeviceOpen(true)}}>Add Device</button>

                </div>
              <section className="device-img">
                <figure className="device-img-lead">
                  <div>
                    <img
                      src={emd}
                      alt="emdDevice"
                      width={"400px"}
                      height={"200px"}
                    />
                  </div>
                  <figcaption>
                    Efficient energy management is now at your fingertips with
                    real-time monitoring and control to optimize consumption.
                    Our smart demand monitoring devices help track and manage
                    peak energy usage with precision. Seamlessly integrate
                    multiple devices for a comprehensive view of energy insights
                    across all your locations.
                  </figcaption>
                </figure>
              </section>
            </div>
            {role==='admin'&&(
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
   )}

            <div className="card-section">
            {role!=='admin'&&(
      <>
      <h3>Active Devices</h3>
       <div className="current-statue-card">
       {active&&active.map(dev=>(
                     <div className="card" onClick={()=>{  window.scrollTo(0, 0);navigate(`/devices/${dev.deviceId}`, {
                      state: {
                        deviceData: dev, 
                      },
                    })}}>
                     <p>Device Id: {dev.deviceId}</p>
                     <p>Device Name: {dev.device_name}</p>
                     <p>Device Location:{dev.device_location}</p>
                   </div>
                  ))}
       </div>
      
       </>
     )}
              <div className="available-card">
                <h3>Available Devices</h3>
                <div className="available-cards">
                  {availableDevice&&availableDevice.map(dev=>(
                     <div className="card" onClick={()=>{  window.scrollTo(0, 0);navigate(`/devices/${dev.deviceId}`, {
                      state: {
                        deviceData: dev, 
                      },
                    })}}>
                     <p>Device Id: {dev.deviceId}</p>
                     <p>Device Name: {dev.device_name}</p>
                     <p>Device Location:{dev.device_location}</p>
                   </div>
                  ))}
                  {/* <div className="card">
                    <p>Device Id:</p>
                    <p>Device Name:</p>
                    <p>Device Location:</p>
                  </div> */}
                 
                </div>
              </div>
            </div>
            {addDeviceOpen&&(
                <>
                <div className="modal-overlay">
                  <div className="modal">
                    <form action="">
                    <label>
               Device ID
                <input
                  type="text"
                  required
                />
              </label>
              <label>
              Enter the Password
                <input
                  type="text"
                  required
                />
              </label>
                    <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={()=>{setAddDeviceOpen(false)}} >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Add
                </button>
              </div>
                    </form>
                  </div>
                </div>
                </>
              )}
          </div>
          <footer className="device-footer">
            <Footer />
          </footer>
        </div>
      
    </>
  );
}
