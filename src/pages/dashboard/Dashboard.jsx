import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import { IoPerson } from "react-icons/io5";
import { HiStatusOnline } from "react-icons/hi";
import './Dashboard.css';
import welcome from '../../assets/welcome.svg';
import asset1 from '../../assets/asset2.jpg';
import Footer from '../../component/footer/Footer';
import axios from 'axios';
import WorkingHoursChart from "./WorkingHoursChart";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [availableDevice, setAvailableDevice] = useState([]);
  const [activeDevice, setActiveDevice] = useState([]);
  const user = localStorage.getItem('user');
  const role = localStorage.getItem('role');
  const [loading, setLoading] = useState(true);
  const userid = localStorage.getItem('userId');
  const [data, setData] = useState([]);

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
        setAvailableDevice(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
              continue;
            }
          } else {
            res = response.data;
          }

          if (res) {
            const items = Array.isArray(res) ? res : [res];
            items.forEach(item => {
              if (item?.rs485_status === '1' || item?.lora_status === '1') {
                activeDevices.push(item);
              }
            });
          }
        }
      }
      setActiveDevice(activeDevices);
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  const getDeviceWorkingHours = async (total) => {
    const data1 = [];
    try {
      // Make all API requests in parallel using Promise.all
      const responses = await Promise.all(total.map(id => {
        const data = {
          requestType: "getDeviceWorkingHours",
          data: JSON.stringify({ deviceId: id }),
        };
  
        return axios.post("https://nissiemd.co.in/mm.php", data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(response => {
          if (response.status === 200 && response.data) {
            const workingHours = calculateWorkingHours(response.data);
            return [id, workingHours];
          }
          return null;
        }).catch(error => {
          console.error(`Error fetching data for device ${id}:`, error);
          return null;
        });
      }));
  
      // Filter out null responses (failed requests)
      const validData = responses.filter(res => res !== null);
      setData(validData);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  
  const calculateWorkingHours = (data) => {
    const groupedData = {};
  
    data.forEach(item => {
      const timestamp = parseInt(item.time, 10);
      const date = new Date(timestamp * 1000);
  
      const istDate = new Date(date.getTime() + 19800000); // Adjust for IST
      const localDateString = istDate.toISOString().split('T')[0];
  
      if (!groupedData[localDateString]) {
        groupedData[localDateString] = {
          timestamps: [],
          totalActiveTime: 0
        };
      }
      groupedData[localDateString].timestamps.push(istDate.getTime() / 1000);
    });
  
    const hoursPerDay = {};
    Object.keys(groupedData).forEach(date => {
      const timestamps = groupedData[date].timestamps;
      timestamps.sort((a, b) => a - b);
  
      let totalActiveTime = 0;
      for (let i = 1; i < timestamps.length; i++) {
        const diff = timestamps[i] - timestamps[i - 1];
        if (diff > 0) totalActiveTime += diff;
      }
      hoursPerDay[date] = parseFloat((totalActiveTime / 3600).toFixed(0)); // Convert to hours and round
    });
  
    return hoursPerDay;
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const total = availableDevice?.map(res => res.deviceId);
    if (total?.length > 0) {
      getActiveDeviceDetails(total);
      getDeviceWorkingHours(total);
    }
  }, [availableDevice]);

  const active = availableDevice?.filter(res => {
    return activeDevice?.some(re => res.deviceId === re.deviceId);
  });

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <Sidebar />
      </div>
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <img src={welcome} alt="Welcome" />
            <h2>
              <span className='text1'>Welcome Back,</span>  <br />
              <span className='text2'>{user}</span>
            </h2>
          </div>
        </div>

        <section className="main-content">
          <div className="admin-main-content">
            <div className="admin-card1">
              <h3>Total Devices</h3>
              <p>{availableDevice?.length || 0}</p>
            </div>
            <div className="admin-card1">
              <h3>Total Active Devices</h3>
              <p>{active?.length || 0}</p>
            </div>
          </div>

          <div className="bar-chat">
            <h3>Last 7 Days Active Hours Available Devices</h3>
            {loading ? (
              <div className="loader">Loading active hours...</div> // Loader for chart
            ) : data?.length > 0 ? (
              <WorkingHoursChart data={data} />
            ) : (
              <div className="empty-state">
                <p>No data available for last 7 days.</p>
              </div>
            )}
          </div>

          <section className="card-section">
            <h3>Active Devices</h3>
            <div className="current-statue-card">
              {loading ? (
                <div className="loader">Loading active devices...</div>
              ) : active?.length > 0 ? (
                active.map((dev) => (
                  <div
                    key={dev.deviceId}
                    className="card active-card"
                    onClick={() => {
                      window.scrollTo(0, 0);
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
                <div className="empty-state">
                  <p>No active devices available.</p>
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
      <div className="dashboard-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
