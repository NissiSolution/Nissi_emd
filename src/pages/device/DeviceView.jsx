import React,{useEffect, useState} from 'react'
import axios from 'axios'
import img from '../../assets/asset3.jpg'
import './DeviceView.css'
import { useParams ,useLocation } from 'react-router-dom'
import ReactSpeedometer from "react-d3-speedometer"
import Sidebar from '../../component/Sidebar/Sidebar'
import Footer from '../../component/footer/Footer'
import { BsThreeDotsVertical } from "react-icons/bs";
import { format } from 'date-fns';
import ReactLoading from 'react-loading';
import { CSVLink } from "react-csv";
export default function DeviceView() {
  let {deviceId}=useParams();
  const location = useLocation();
  const { deviceData } = location.state || {};  
  const [deviceDetails,setDeviceDetails]=useState()
  const [isProfileOpen, setIsProfileOpen] = useState(false);
      const [isPowerOpen,setIsPowerOpen]=useState(false)
      const [avgPower,setAvgPower]=useState()
      const [isDeviceDetailOpen,SetIsDeviceDetailOpen]=useState(false)
  const [currentDevice,setCurrentDevice]=useState()
  const [device,setDevice]=useState()
  const[RS485,setRS485]=useState()
  const[lora,setLora]=useState()
  const [exportIsOpen,setExportIsOpen]=useState(false)
  const [exportData,setExportData]=useState([])
  const [loading,setLoading]=useState(false)
const [customDate,setCustomDate]=useState({})
const [disable,setDisable]=useState(true)
const [time,setTime]=useState()
  const [deviceInput,setDeviceInput]=useState({
    deviceId: '',
    buzzer_start_value:'',
    buzzer_time: '',
    relay1_start_value: '',
    relay1_time: '',
    relay1_wait_time: '',
    relay2_start_value:'',
    relay2_wait_time: '',
    
  })
  const [dropdownValue,setDropdownValue]=useState('')
  const [presentPower,setPresentPower]=useState()
  const handleDeviceChange = (e) => {
    const { name, value } = e.target;
    setDeviceDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;

    // Calculate the end date as 31 days later
    const newEndDate = new Date(selectedStartDate);
    newEndDate.setDate(newEndDate.getDate() + 5);
    setCustomDate({
      startDate: selectedStartDate,
      endDate: newEndDate.toISOString().split("T")[0], // Set to ISO format (yyyy-mm-dd)
    });
  };

  // Handler for end date change
  const handleEndDateChange = (e) => {
    setCustomDate({
      ...customDate,
      endDate: e.target.value
    });
  };
  const handlePowerDeviceDetails = () => {
    if (currentDevice) {
      setDeviceInput({
        deviceId: currentDevice.deviceId,
        buzzer_start_value: currentDevice?.buzzer_start_value,
        buzzer_time: currentDevice?.buzzer_time,
        relay1_start_value: currentDevice?.relay1_start_value,
        relay1_time: currentDevice?.relay1_time,
        relay1_wait_time: currentDevice?.relay1_wait_time,
        relay2_start_value: currentDevice?.relay2_start_value,
        relay2_wait_time: currentDevice?.relay2_wait_time,
        
      });
    }
    setIsPowerOpen(true);
  };
  // console.log(deviceInput);
  

  const handleDeviceInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  
      const meter=()=>{
        if(currentDevice?.type==='0')
        {
          return parseFloat(device?.act_pwr_mxd).toFixed(1)
        }
        else{
          return parseFloat(device?.kva_mxd).toFixed(1)
        }
      } 
      
      const handleEditDeviceDetails = () => {
        // Set device details when the modal opens
        if (currentDevice) {
          setDeviceDetails({
            deviceId: currentDevice.deviceId,
            device_name: currentDevice.device_name,
            device_location: currentDevice.device_location,
          });
        }
        SetIsDeviceDetailOpen(true)
      };
      const meterValue=meter()
      let startValue,endValue;
      // console.log(meterValue);
      const meterFunction= async()=>{
        const buzzerStart = parseInt(currentDevice?.buzzer_start_value) ; 
        const relay1Start = parseInt(currentDevice?.relay1_start_value); 
        const relay2Start = parseInt(currentDevice?.relay2_start_value) ;
        // console.log(buzzerStart,relay1Start,relay2Start);
        
        if (meterValue < buzzerStart) {
          startValue = 0;
          endValue = buzzerStart - 1;
          // console.log('a'+startValue,endValue);
          
      } else if (meterValue >= buzzerStart && meterValue < relay1Start) {
          startValue = buzzerStart;
          endValue = relay1Start;
          // console.log('b'+startValue,endValue);

      } else if (meterValue >= relay1Start && meterValue < relay2Start) {
          startValue = relay1Start;
          endValue = relay2Start;
          // console.log('c'+startValue,endValue);

      } else {
          startValue = relay2Start;
          endValue = relay2Start + 100;
          // console.log('d'+startValue,endValue);
      
        }
      }
      meterFunction()
      // console.log(startValue,endValue);
      
  const handleToggleDropdown = (e) => {
    e.stopPropagation();
    setIsProfileOpen((prev) => !prev);
};

const handleDocumentClick = () => {
  if (isProfileOpen) {
      setIsProfileOpen(false); 
  }
};
document.onclick = handleDocumentClick;

  // const random=Math.floor(Math.random()*108)
  const getCurrentDeviceDetails=async ()=>{
    try {
      const data = {
        requestType: "getDeviceInput",
        data: JSON.stringify({ deviceId: deviceId }),
      }; 
      const response = await axios.post("https://nissiemd.co.in/mm.php", data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      // Handle response
      if (response.status === 200) {
        if (response.data === "failure") {
          console.error("Request failed:", response.data)
        }
        else{
          setCurrentDevice(response.data)
          
        }
      }


    }
    catch (error) {
      console.error("Error during API call:", error);
    }
  }

  const getCurrentData = async () => {
    try {
      // Prepare data payload
      const data = {
        requestType: "getCurrentData",
        data: JSON.stringify({ deviceId: deviceId }),
      };
  
      // Perform POST request
      const response = await axios.post("https://nissiemd.co.in/mm.php", data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      // Handle response
      if (response.status === 200) {
        if (response.data === "failure") {
          console.error("Request failed:", response.data);
          // Replace the following with your preferred error message handling
          // alert("Request failed: " + response.data);
        } else {
          // console.log("Success:", response.data);
          // Process response data as needed
          setDevice(response.data)
        }
      } else {
        console.error("Unexpected response code:", response.status);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  
   const buttonChange=(type)=>{
    try {
      let da;
      // Prepare data payload
      if(type==='0')
      {
        da='0'
      }
      else{
        da='1'
      }
      const data = {
        requestType: "updataLtHt",
        data: JSON.stringify({ deviceId: deviceId, type : da }),
      };
  
      // Perform POST request
      const response = axios.post("https://nissiemd.co.in/mm.php", data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      // Handle response
      if (response) {
        console.log('successfully')
        
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }

   }


  const handleDeviceSubmit = async (e) => {
    e.preventDefault();
    // Submit the updated device details
    try {
      const data = {
        requestType: "updateInput2",
        data: JSON.stringify(deviceDetails),
      };
      const response = await axios.post("https://nissiemd.co.in/mm.php", data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status === 200) {
        if(response.data ==='status-updated')
        {
        alert('Device details updated successfully');

          SetIsDeviceDetailOpen(false); // Close the modal

        }
      }
    } catch (error) {
      console.error("Error updating device details:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   
      const data = {
        requestType: "updateInput1",
        data: JSON.stringify(deviceInput),
      };
      const response = await axios.post("https://nissiemd.co.in/mm.php", data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status === 200) {
        if(response.data)
        {
          alert('Device settings updated successfully');
          setIsPowerOpen(false);
        }
        
      }
    } catch (error) {
      console.error("Error updating device settings:", error);
    }
  };
  const calculateTotalKW = (item) => {
    // Implement your calculation logic here
    // For example, if you have other fields like 'power' and 'time', you can calculate it as follows:
    const power = parseFloat(item.t_kw) || 0; // Replace with actual field names
    const time = parseFloat(item.time) || 1; // Avoid division by zero
    return power / time; // Example calculation
};
 const getTime =async()=>{
  try { 
    let data;
    setLoading(true)
    const today = new Date(); 
    const date = format(today, 'dd');
    const year = format(today, 'yyyy'); 
    const month = format(today, 'MM');

    if (dropdownValue === 'today') {
      data = {
        requestType: 'getTodayData',
        data: JSON.stringify({
          deviceId:deviceId,
          date: date,
          month: month,
          year: year,
        }),
      };
      // console.log(data);
      
    } else if (dropdownValue === 'thisweek') {
      data = {
        requestType: 'getThisWeek',
        data: JSON.stringify({
          deviceId: deviceId,
        }),
      };
      // console.log(data);
    }
     else if (dropdownValue === 'lastweek') {
      data = {
        requestType: 'getPreviousWeek',
        data: JSON.stringify({
          deviceId: deviceId,
        }),
      };
      // console.log(data);
    }
     else if (dropdownValue === 'lastprevious') {
      data = {
        requestType: 'getYesterday',
        data: JSON.stringify({
          deviceId: deviceId,
        }),
      };
      // console.log(data);
    }
      // else if (dropdownValue === 'thismonth') {
    //   data = {
    //     requestType: 'getThisMonth',
    //     data: JSON.stringify({
    //       deviceId: deviceId,
    //     }),
    //   };
    //   console.log(data);
    // }   
    else if (dropdownValue==='custom') {
      const start = customDate.startDate + ' 00:00:00'; // Start date from your state
      const end = customDate.endDate + ' 23:59:59'; // End date from your state

      if (start && end) {
        data = {
          requestType: 'custom',
          data: JSON.stringify({
            deviceId: deviceId,
            start: start,
            end: end,
          }),
        };
      // console.log(data);

      } 
    }else{
      return;
    }
        
 
    const response = await axios.post("https://nissiemd.co.in/mm.php", data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.status === 200) {
      if(response.data)
      {
        const preparedData = response.data.map(item => {
          const tim = new Date(item.time * 1000); // Convert UNIX timestamp to Date object
          const formattedTime = format(tim, 'dd-MM-yyyy hh:mm:ss a'); // Format the date
      
          return {
              ...item,
              time: formattedTime, 
          };
        
        })
        setExportData(preparedData)

        if(response.data==='failure')
        {
          alert('data fetching Error')
          setDisable(true)
          setCustomDate('')
          setDropdownValue('')
        }
        else{
          setDisable(false)
        }
        // setExportIsOpen(false);
      }
      
    }
  } catch (error) {
    setDisable(true);
    console.error("Error  :", error.response);
  }
  finally {
    setLoading(false); // Ensure loading is set to false after the request
}

 }
  useEffect(() => {
    getCurrentData();
    getCurrentDeviceDetails()
  
    const intervalId = setInterval(() => {
      getCurrentData();
    }, 2000);  

    return () => clearInterval(intervalId);
  }, [deviceId,currentDevice,deviceDetails]);
      let type=currentDevice?.type
  
  useEffect(() => {
    if (device) {
      setLora(device.lora_status);
      setRS485(device.rs485_status);
      const tim = new Date(device?.time * 1000); // Convert UNIX timestamp to Date object
      const formattedTime = format(tim, 'dd-MM-yyyy hh:mm:ss a');
     setTime(formattedTime)
      if(device.t_kva > 0 && device.t_kw > 0){
            setPresentPower(parseFloat(device?.t_kw)/parseFloat(device?.t_kva)||'0')
      }
      if (device.t_act_energy > 0 && device.t_aprnt_engy > 0) {
        setAvgPower(parseFloat(device?.t_act_energy) / parseFloat(device?.t_aprnt_engy));
      }
    }
  }, [device]);  
// console.log(time);

// console.log(device);
// const date = new Date(time * 1000);
// const date = moment.unix(time).format("MM/DD/YYYY HH:mm:ss A");
// console.log(customDate);
const closeModel=()=>{
  setLoading(false)
  setCustomDate('')
  setDropdownValue('')
  setExportIsOpen(false)
}

const headers = [
  { label: "ID", key: "id" },
  { label: "Device ID", key: "deviceId" },
  { label: "Voltage R-N", key: "v1N" },
  { label: "Voltage Y-N", key: "v2N" },
  { label: "Voltage B-N", key: "v3N" },
  { label: "Voltage R-Phase", key: "i1" },
  { label: "Voltage Y-Phase", key: "i2" },
  { label: "Voltage B-Phase", key: "i3" },
  { label: "Frequency", key: "freq" },
  { label: "Total Active Power", key: "t_kw" },
  { label: "Total Reactive Power", key: "t_kvar" },
  { label: "Total Apparent Power", key: "t_kva" },
  { label: " Active Power Max Demand", key: "act_pwr_mxd" },
  { label: "Apparent Power Max Demand", key: "kva_mxd" },
  { label: "Total Active Energy", key: "t_act_energy" },
  { label: "RY Voltage", key: "ryV" },
  { label: "YB Voltage", key: "ybV" },
  { label: "BR Voltage", key: "brV" },
  { label: "Total Apparent Energy", key: "t_aprnt_engy" },
  { label: "Time", key: "time" },
  { label: "RS485 Status", key: "rs485_status" },
  { label: "LoRa Status", key: "lora_status" }
]

  return (
    <>
    <div className="device-view-page">
      <div className="device-view-sidebar">
        <Sidebar/>
      </div>
      <div className="device-view-main">
        <div className="device-view-header  " onClick={(e) => e.stopPropagation()}>
        <h2>{currentDevice?.device_name}</h2>
  <div className="user-action   " onClick={handleToggleDropdown}>
                <BsThreeDotsVertical />
            </div>
            {isProfileOpen && (
                <div className="edit-user device-action">
                    <p onClick={()=>handleEditDeviceDetails()}>Device Details</p>
                    <p onClick={()=>handlePowerDeviceDetails()}>Power Max</p>
                    <p onClick={()=>{setExportIsOpen(true)}}   >Export</p>
                </div>
            )}
        </div>
          <div className="device-view-info">
            <div className="img-info">
            <figure className='view-img'>
              <img src={img} alt="" />
            </figure>
            <div className="device-details">
              <p>Device ID : {currentDevice?.deviceId}</p>
              <p>Device Name :{currentDevice?.device_name}</p>
        <p>Device Location: {currentDevice?.device_location}</p>
            </div>
            </div>
          
            <div className="meter">
           
            <ReactSpeedometer
    minValue={startValue}
     
    maxValue={endValue}
    value={meterValue}
    needleColor="red"
    startColor="green"
    segments={10}  
    endColor="red"
    textColor={'#fff'}
    currentValueText={`${meterValue}  ${type === '0' ? 'Active Power Max Demand' : 'Apparent Power Max Demand'}    `}
     forceRender={true}
  />
            </div>
          </div>
          <div className="active-btn-time">
          <div className="active-btns">
  <div className={`${type === '0'?'offcolor':'active-btn'} ht `} onClick={()=>{buttonChange('0')}}>LT</div>
   <div className={`${type === '1'?'offcolor':'active-btn'} ht `} onClick={()=>{buttonChange('1')}}>HT</div>
 </div>
 <div className="time"> 
 <span>UpdatedTime :</span> <span>
 {time||'unknown'}
  </span> 
 </div>
          </div>
  
          <div className="device-status">
            <div className="active box">
             <div className="box-lead"> RS485 Status</div>
              <span className={`${RS485 ==='2'?'state-off':'state'||'state-off'} box-sub-lead`}>{RS485 === '2' ? 'Off':"On"||'Unknown'} </span>
            </div>
            <div className=" box">
              <p className="box-lead">LORA Status</p>
              <span className={` ${lora === '2'?'state-off':'state'||'state-off'} box-sub-lead`}>{lora==='2'?'Off':'On'||'Unknown'}</span>
            </div>
            <div className="active-power box">
              <p className="box-lead">Active PowerMaxDemand</p>
              <span className="box-sub-lead">
                {device&&parseFloat(device.act_pwr_mxd).toFixed(2)|| 0.0}
                <span>Kw</span>
              </span>
            </div>
            <div className="active-power box">
              <p className="box-lead">ApparentPowerMaxDemand</p>
              <span className="box-sub-lead">
                {device&&parseFloat(device.kva_mxd|| 0).toFixed(2)|| 0.0}
                <span>Kw</span>
              </span>
            </div>
            <div className="avg-power box">
              <p className="box-lead">Average Power Factor</p>
              <span className="box-sub-lead">
                {avgPower&&parseFloat(avgPower).toFixed(2)||0.0} <span></span>
              </span>
            </div>
          
          </div>
          <div className="device-table-details">
          
      
            <div className="label">
               <div className="first-label">Voltage R-N</div>
               <div className="second-label"> <span className="cen">:</span> {device?.v1N||0.00} <span className="side-value">V</span></div>
            </div>
            <div className="label">
               <div className="first-label"> Voltage Y-N</div>
               <div className="second-label"><span className="cen">:</span> {device?.v2N||0.00} <span className="side-value">V</span></div>
            </div>
            <div className="label">
               <div className="first-label">Voltage B-N</div>
               <div className="second-label"><span className="cen">:</span> {device?.v3N||0.00} <span className="side-value">V</span></div>
            </div>
            <div className='space-bar'></div>
            <div className="label">
               <div className="first-label">Voltage R-Y</div>
               <div className="second-label"><span className="cen">:</span> {device?.ryV||0.00}<span className="side-value">V</span></div>
            </div>
            <div className="label">
               <div className="first-label"> Voltage Y-B</div>
               <div className="second-label"><span className="cen">:</span> {device?.ryV||0.00} <span className="side-value">V</span></div>
            </div>
            <div className="label">
               <div className="first-label">Voltage B-R</div>
               <div className="second-label"><span className="cen">:</span> {device?.brV||0.00} <span className="side-value">V</span></div>
            </div>
            <div className='space-bar'></div>

            <div className="label">
               <div className="first-label">Voltage R-Phase</div>
               <div className="second-label"><span className="cen">:</span> { parseFloat(device?.i1).toFixed(1)||0.00}<span className="side-value">A</span></div>
            </div>
            <div className="label">
               <div className="first-label"> Voltage Y-Phase</div>
               <div className="second-label"><span className="cen">:</span> { parseFloat(device?.i2).toFixed(1)||0.00} <span className="side-value">A</span></div>
            </div> 
            <div className="label">
               <div className="first-label">Voltage B-Phase</div>
               <div className="second-label"><span className="cen">:</span>{ parseFloat(device?.i3).toFixed(1)||0.00} <span className="side-value">A</span></div>
            </div>
            <div className='space-bar'></div>

            <div className="label">
               <div className="first-label">Frequency</div>
               <div className="second-label"><span className="cen">:</span> {device?.freq||0.00}<span className="side-value">Hz</span></div>
            </div>
            <div className="label">
               <div className="first-label">Total Active Power</div>
               <div className="second-label"><span className="cen">:</span> {device?.t_kw||0.00} <span className="side-value">kW</span></div>
            </div>
            <div className="label">
               <div className="first-label"> Total Reactive Power</div>
               <div className="second-label"><span className="cen">:</span> {device?.t_kvar||0.00} <span className="side-value">kVAR</span></div>
            </div>
            <div className="label">
               <div className="first-label"> Total Apparent Power</div>
               <div className="second-label"><span className="cen">:</span> {device?.t_kva||0.00} <span className="side-value">kVA</span></div>
            </div>
            <div className="label">
               <div className="first-label">Present Power Factor</div>
               <div className="second-label"><span className="cen">:</span>{presentPower?parseFloat(presentPower).toFixed(2):0}</div>
            </div>
            <div className='space-bar'></div>

            <div className="label">
               <div className="first-label">Total Active Energy</div>
               <div className="second-label"><span className="cen">:</span> {device?.t_act_energy||0.00} <span className="side-value">kwh</span></div>
            </div>
            <div className="label">
               <div className="first-label">Total Apparent Energy</div>
               <div className="second-label"><span className="cen">:</span> {device?.t_aprnt_engy||0.00} <span className="side-value">kVAh</span></div>
            </div>
            <div className="label">
               <div className="first-label">Average Power Factor</div>
               <div className="second-label"><span className="cen">:</span> {parseFloat(avgPower).toFixed(2)||0}</div>
            </div>
            <div className="label">
               <div className="first-label"> Active Power Max Demand</div>
               <div className="second-label"><span className="cen">:</span>{parseFloat(device?.act_pwr_mxd).toFixed(2)||0.00} <span className="side-value">kW</span></div>
            </div>
            <div className="label">
               <div className="first-label"> Apparent Power Max Demand</div>
               <div className="second-label"><span className="cen">:</span> {parseFloat(device?.kva_mxd).toFixed(2)||0.00} <span className="side-value">kWA</span></div>
            </div>


          </div>
          {isPowerOpen && (
            <div className="modal-overlay">
              <div className="modal device-view-modal">
                <h2>Edit Device Settings</h2>
                <form className="device-view-details" onSubmit={handleSubmit}>
                  <label>
                    Buzzer Min Value
                    <input
                      type="text"
                      required
                      name='buzzer_start_value'
                      value={deviceInput?.buzzer_start_value || ''}
                      onChange={handleDeviceInputChange}
                    />
                  </label>
                  < label>
                    Buzzer Watch Time (in minutes)
                    <input
                      type="text"
                      required
                      name='buzzer_time'
                      value={deviceInput?.buzzer_time || ''}
                      onChange={handleDeviceInputChange}
                    />
                  </label>
                  <label>
                    Feeder Min Value
                    <input
                      type="text"
                      required
                      name='relay1_start_value'
                      value={deviceInput?.relay1_start_value || ''}
                      onChange={handleDeviceInputChange}
                    />
                  </label>
                  <label>
                  Feeder Watch Time (in minutes)
                    <input
                      type="text"
                      required
                      name='relay1_wait_time'
                      value={deviceInput?.relay1_time || ''}
                      onChange={handleDeviceInputChange}
                    />
                  </label>
                  <label>
                    Feeder Wait Time After Power OFF (in minutes)
                    <input
                      type="text"
                      required
                      name='relay1_wait_time'
                      value={deviceInput?.relay1_wait_time || ''}
                      onChange={handleDeviceInputChange}
                    />
                  </label>
                  <label>
                    Motor Min Value
                    <input
                      type="text"
                      required
                      name='relay2_start_value'
                      value={deviceInput?.relay2_start_value || ''}
                      onChange={handleDeviceInputChange}
                    />
                  </label>
                  <label>
                    Motor Timing (in minutes)
                    <input
                      type="text"
                      required
                      name='relay2_wait_time'
                      value={deviceInput?.relay2_wait_time || ''}
                      onChange={handleDeviceInputChange}
                    />
                  </label>
                  <div className="modal-actions">
                    <button type="button" className="cancel-btn" onClick={() => setIsPowerOpen(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="save-btn">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
                 {exportIsOpen && (
    <div className={`modal-overlay ${exportIsOpen ? 'active' : ''}`}>
        <div className={`modal ${exportIsOpen ? 'active' : ''}`}>
            <h3>Export</h3>
            <br />
            <form onSubmit={getTime} className="export">
                <div>
                    <h4>Select Duration</h4>
                    <label htmlFor="">
                        <select
                            required
                            onChange={(e) => setDropdownValue(e.target.value)}
                        >
                            <option value="" disabled selected>Select the value</option>
                            <option value="today">Today</option>
                            <option value="lastprevious">Last Day</option>
                            <option value="custom">Custom</option>
                        </select>
                    </label>

                    {dropdownValue === 'custom' && (
                        <div className='custom'>
                            <h4>Pick a date range</h4>
                            <label htmlFor="startdate">
                                Start Date
                                <input
                                    type="date"
                                    name="startDate"
                                    id="startDate"
                                    value={customDate.startDate}
                                    onChange={handleStartDateChange}
                                />
                            </label>

                            <label htmlFor="enddate">
                                End Date
                                <input
                                    type="date"
                                    name="endDate"
                                    id="endDate"
                                    value={customDate.endDate}
                                    onChange={handleEndDateChange}
                                    min={customDate.startDate}
                                    max={customDate?.endDate}
                                />
                            </label>
                        </div>
                    )}

                    {loading && (
                        <div className="" style={{ display: 'flex', justifyContent: 'center' }}>
                            <ReactLoading type={'spin'} color={'#00f'} height={'30%'} width={'30%'} />
                        </div>
                    )}

                    {dropdownValue && (
                        <button type="button" onClick={getTime} className="save-btn load" disabled={loading}>
                            Load
                        </button>
                    )}
                </div>

                <div className="modal-actions">
                    <button type="button" className="cancel-btn" onClick={closeModel}>
                        Cancel
                    </button>
                    <button type="button" className={` ${disable ? 'disable' : 'save-btn'}`} disabled={disable}>
                    {exportData?.length > 0 ? (
                <CSVLink 
                    data={exportData} 
                    headers={headers} 
                    filename={`emd-device-${dropdownValue}.csv`} 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    Download
                </CSVLink>
            ) : (
                 <>
                 No Data Available
                 </>   
            )}
                    </button>
                </div>
            </form>
        </div>
    </div>
)}
        
          {isDeviceDetailOpen&&
          (<>
          <div className="modal-overlay">
            <div className="modal">
              <form action="" className="device-view-details" onSubmit={handleDeviceSubmit}>
              <label>
               Device ID
                <input
                  type="text"
                  required
                  name='deviceId'

                  value={deviceDetails?.deviceId||''}
                  onChange={handleDeviceChange}
                />
              </label>
              <label>
              Device Name
                <input
                  type="text"
                  required
                  onChange={handleDeviceChange}

                  value={deviceDetails?.device_name||''}
                  name='device_name'
                />
              </label>
              <label>
               Device Location
                <input
                  type="text"
                  required
                  value={deviceDetails?.device_location||''}
                  name='device_location'
                  onChange={handleDeviceChange}
                />
              </label>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={()=>{SetIsDeviceDetailOpen(false)
                  setDeviceDetails('')}} >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Update
                </button>
              </div>
              </form>
            </div>
          </div>
          </>)}
      </div>
      <div className="device-view-footer">
        <Footer/>
      </div>
    </div>
    </>
  )
}
