import React, { useState, useEffect } from "react";
import "./Device.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../component/Sidebar/Sidebar";
import Footer from "../../component/footer/Footer";
import emd from "../../assets/asset4.png";
import { HiStatusOnline } from "react-icons/hi";
export default function Device() {
  const [availableDevice, setAvailableDevice] = useState([]); // Initialize as an empty array
  const [activeDevice, setActiveDevice] = useState([]); // Initialize as an empty array
  const [addDeviceOpen, setAddDeviceOpen] = useState(false);
  const [addDevice, setAddDevice] = useState({});
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const userid = localStorage.getItem('userId');
  const [loading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddDevice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        requestType: "addDevice",
        data: JSON.stringify({ userId: userid, deviceId: addDevice.deviceId, password: addDevice.password }),
      };
      const response = await axios.post("https://nissiemd.co.in/mm.php", data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status === 200) {
        if(response.data ==='device-added')
        {
          addDevice('')
          alert('Device added successfully');
          addDeviceOpen(false)
        }
        else{
          if(response.data === "invalid-deviceID")
          {
            alert('invalid-deviceID')
          }
          if(response.data==="device-exists")
          {
            alert("device-exists")
            addDevice('')

          addDeviceOpen(false)
            

          }
          else{
            alert(response.data)
          }
        }
      }
    } catch (error) {
      console.error("Error saving device:", error);
    }
  };

  const fetchData = async () => {
    const data = {
      requestType: 'getAvailableDevices',
      data: JSON.stringify({ userId: userid }),
    };
    try {
      const response = await axios.post("https://nissiemd.co.in/mm.php", data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.data) {
        setAvailableDevice(response.data || []); // Ensure it's an array
      }
    } catch (error) {
      console.error(error);
    }
  };
const closePass=()=>{
  setAddDevice('')
  setAddDeviceOpen(false)
}
  const getActiveDeviceDetails = async (total) => {
    const activeDevices = [];
    try {
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
        if (response.status === 200) {
          let res;
          if (typeof response.data === 'string') {
            try {
              res = JSON.parse(response.data);
            } catch (e) {
              console.error("Error parsing response data:", e);
              continue; // Skip this iteration if parsing fails
            }
          } else {
            res = response.data;
          }
          if (res) {
            const items = Array.isArray(res) ? res : [res];
            items.forEach(item => {
              if (item.rs485_status === '1' || item.lora_status === '1') {
                activeDevices.push(item);
              }
            });
          } }
        }
      
      setActiveDevice(activeDevices); // Set active devices after the loop
    } catch (error) {
      console.error("Error during API call:", error);
    }
    finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData();
  }, [addDevice]);

  useEffect(() => {
    const total = availableDevice?.map(res => res.deviceId);
    if (total?.length > 0) {
      getActiveDeviceDetails(total);
    }
  }, [availableDevice]);

  const active = availableDevice?.filter(res => {
    return activeDevice?.some(re => res.deviceId === re.deviceId);
  });
  return (
    <>
      <div className="device-page">
        <div className="device-sidebar">
          <Sidebar />
        </div>
        <div className="device-main">
          <div className="device-info">
            <div className="device-lead">
              <h3>Energy Monitoring Device</h3>
              <button className="btn" onClick={() => { setAddDeviceOpen(true) }}>Add Device</button>
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
          {/* {role === 'admin' && (
            <div className="admin-main-content">
              <div className="admin-card1">
                <h3>Total Devices</h3>
                <p>{availableDevice.length}</p>
              </div>
              <div className="admin-card1">
                <h3>Total Active Devices</h3>
                <p>{active.length}</p>
              </div>
            </div>
          )} */}
          <div className="card-section">
            {role !== 'admin' && (
              <>
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
              </>
            )}
            <div className="available-card">
              <h3>Available Devices</h3>
              <div className="available-cards">
                {availableDevice && availableDevice?.map(dev => (
                  <div className="card" onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/devices/${dev.deviceId}`, {
                      state: {
                        deviceData: dev,
                      },
                    });
                  }}>
                    <p>Device Id: {dev.deviceId}</p>
                    <p>Device Name: {dev.device_name}</p>
                    <p>Device Location: {dev.device_location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {addDeviceOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <form onSubmit={handleSubmit}>
                  <label>
                    Device ID
                    <input
                      type="text"
                      required
                      name="deviceId"
                      value={addDevice.deviceId}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Enter the Password
                    <input
                      type="text"
                      required
                      name="password"
                      value={addDevice.password}
                      onChange={handleInputChange}
                    />
                  </label>
                  <div className="modal-actions">
                    <button type="button" className="cancel-btn" onClick={() => { closePass() }}>
                      Cancel
                    </button>
                    <button type="submit" className="save-btn">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <footer className="device-footer">
          <Footer />
        </footer>
      </div>
    </>
  );

}