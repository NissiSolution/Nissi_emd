import React,{useEffect, useState} from 'react'
import axios from 'axios'
import img from '../../assets/asset3.png'
import './DeviceView.css'
import { useParams ,useLocation } from 'react-router-dom'
import ReactSpeedometer from "react-d3-speedometer"
import Sidebar from '../../component/Sidebar/Sidebar'
import Footer from '../../component/footer/Footer'
import { BsThreeDotsVertical } from "react-icons/bs";

export default function DeviceView() {
  let {deviceId}=useParams();
  const location = useLocation();
  const { deviceData } = location.state || {};  
  const [currentDevice,setCurrentDevice]=useState()
  const [device,setDevice]=useState()
  const[RS485,setRS485]=useState()
  const[lora,setLora]=useState()
  const [presentPower,setPresentPower]=useState()

  const [isProfileOpen, setIsProfileOpen] = useState(false);
      const [isPowerOpen,setIsPowerOpen]=useState(false)
      const [avgPower,setAvgPower]=useState()
      const [isDeviceDetailOpen,SetIsDeviceDetailOpen]=useState(false)
      const meter=()=>{
        if(currentDevice?.type==='0')
        {
          return parseFloat(device?.act_pwr_mxd).toFixed(1)
        }
        else{
          return parseFloat(device?.kva_mxd).toFixed(1)
        }
      } 
      
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

  useEffect(() => {
    getCurrentData();
    getCurrentDeviceDetails()
    const intervalId = setInterval(() => {
      getCurrentData();
    }, 2000);  

    return () => clearInterval(intervalId);
  }, [deviceId,currentDevice]);
      let type=currentDevice?.type
  
  useEffect(() => {
    if (device) {
      setLora(device.lora_status);
      setRS485(device.rs485_status);
      
      if(device.t_kva > 0 && device.t_kw > 0){
            setPresentPower(parseFloat(device.t_kw)/parseFloat(device.t_kva))
      }
      if (device.t_act_energy > 0 && device.t_aprnt_engy > 0) {
        setAvgPower(parseFloat(device?.t_act_energy) / parseFloat(device?.t_aprnt_engy));
      }
    }
  }, [device]);  
// console.log(currentDevice);

  console.log(type);
  
  
  return (
    <>
    <div className="device-view-page">
      <div className="device-view-sidebar">
        <Sidebar/>
      </div>
      <div className="device-view-main">
        <div className="device-view-header  " onClick={(e) => e.stopPropagation()}>
        <h2>{deviceData.device_name}</h2>
  <div className="user-action   " onClick={handleToggleDropdown}>
                <BsThreeDotsVertical />
            </div>
            {isProfileOpen && (
                <div className="edit-user device-action">
                    <p onClick={()=>SetIsDeviceDetailOpen(true)}>Device Details</p>
                    <p onClick={()=>setIsPowerOpen(true)}>Power Max</p>
                </div>
            )}
        </div>
          <div className="device-view-info">
            <div className="img-info">
            <figure className='view-img'>
              <img src={img} alt="" />
            </figure>
            <div className="device-details">
              <p>Device ID : {deviceData.deviceId}</p>
              <p>Device Name :{deviceData.device_name}</p>
        <p>Device Location: {deviceData.device_location}</p>
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
    textColor={'#333'}
    currentValueText={`${type === '0' ? 'Active Power Max Demand' : 'Apparent Power Max Demand'}`}
     forceRender={true}
  />
            </div>
          </div>
          <div className="active-btns">
  <div className={`${type === '0'?'offcolor':'active-btn'} ht `} onClick={()=>{buttonChange('0')}}>LT</div>
   <div className={`${type === '1'?'offcolor':'active-btn'} ht `} onClick={()=>{buttonChange('1')}}>HT</div>
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
                {avgPower&&parseFloat(avgPower).toFixed(3)||0.0} <span></span>
              </span>
            </div>
          
          </div>
          <div className="device-table-details">
          
      
            <div className="label">
               <div className="first-label">Voltage R-N</div>
               <div className="second-label"> <span className="cen">:</span> {device?.v1N||0.00}V</div>
            </div>
            <div className="label">
               <div className="first-label"> Voltage Y-N</div>
               <div className="second-label"><span className="cen">:</span> {device?.v2N||0.00} V</div>
            </div>
            <div className="label">
               <div className="first-label">Voltage B-N</div>
               <div className="second-label"><span className="cen">:</span> {device?.v2N||0.00} V</div>
            </div>
            <div className='space-bar'></div>
            <div className="label">
               <div className="first-label">Voltage R-Y</div>
               <div className="second-label"><span className="cen">:</span> {device?.ryV||0.00}V</div>
            </div>
            <div className="label">
               <div className="first-label"> Voltage Y-B</div>
               <div className="second-label"><span className="cen">:</span> {device?.ryV||0.00} V</div>
            </div>
            <div className="label">
               <div className="first-label">Voltage B-R</div>
               <div className="second-label"><span className="cen">:</span> {device?.brV||0.00} V</div>
            </div>
            <div className='space-bar'></div>

            <div className="label">
               <div className="first-label">Voltage R-Phase</div>
               <div className="second-label"><span className="cen">:</span> {device?.i1||0.00} A</div>
            </div>
            <div className="label">
               <div className="first-label"> Voltage Y-Phase</div>
               <div className="second-label"><span className="cen">:</span> {device?.i2||0.00} A</div>
            </div>
            <div className="label">
               <div className="first-label">Voltage B-Phase</div>
               <div className="second-label"><span className="cen">:</span>{device?.i3||0.00} A</div>
            </div>
            <div className='space-bar'></div>

            <div className="label">
               <div className="first-label">Frequency</div>
               <div className="second-label"><span className="cen">:</span> {device?.freq||0.00}Hz</div>
            </div>
            <div className="label">
               <div className="first-label">Total Active Power</div>
               <div className="second-label"><span className="cen">:</span> {device?.t_kw||0.00} kW</div>
            </div>
            <div className="label">
               <div className="first-label"> Total Reactive Power</div>
               <div className="second-label"><span className="cen">:</span> {device?.t_kvar||0.00} kVAR</div>
            </div>
            <div className="label">
               <div className="first-label"> Total Apparent Power</div>
               <div className="second-label"><span className="cen">:</span> {device?.t_kva||0.00} kVA</div>
            </div>
            <div className="label">
               <div className="first-label">Present Power Factor</div>
               <div className="second-label"><span className="cen">:</span>{parseFloat(presentPower).toFixed(3)}</div>
            </div>
            <div className='space-bar'></div>

            <div className="label">
               <div className="first-label">Total Active Energy</div>
               <div className="second-label"><span className="cen">:</span> {device?.t_act_energy||0.00} kWh</div>
            </div>
            <div className="label">
               <div className="first-label">Total Apparent Energy</div>
               <div className="second-label"><span className="cen">:</span> {device?.t_aprnt_engy||0.00} kVAh</div>
            </div>
            <div className="label">
               <div className="first-label">Average Power Factor</div>
               <div className="second-label"><span className="cen">:</span> {parseFloat(avgPower).toFixed(3)}</div>
            </div>
            <div className="label">
               <div className="first-label"> Active Power Max Demand</div>
               <div className="second-label"><span className="cen">:</span>{device?.act_pwr_mxd||0.00} kW</div>
            </div>
            <div className="label">
               <div className="first-label"> Apparent Power Max Demand</div>
               <div className="second-label"><span className="cen">:</span> {device?.kva_mxd||0.00} kWA</div>
            </div>


          </div>
          {
            isPowerOpen&&(<>
            <div className="modal-overlay">
              <div className="modal">
                <form action="" className='power-max'>
                <label>
               Buzzer Min Value
                <input
                  type="text"
                  required
                />
              </label>
              <label>
              Buzzer Watch Time(in minutes)
                <input
                  type="text"
                  required
                />
              </label>
              <label>
               Feeder Min Value
                <input
                  type="text"
                  required
                />
              </label>
                <label>
               Feeder Wait Time After PowerOFF(in minutes)
                <input
                  type="text"
                  required
                />
              </label>
              <label>
              Motor Min Value
                <input
                  type="text"
                  required
                />
              </label>
              <label>
               Motor Timing(in minutes)
                <input
                  type="text"
                  required
                />
              </label>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={()=>{setIsPowerOpen(false)}} >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Update
                </button>
              </div>

                </form>
              </div>
            </div>
            
            </>)
          }
          {isDeviceDetailOpen&&
          (<>
          <div className="modal-overlay">
            <div className="modal">
              <form action="" className="device-view-details">
              <label>
               Device ID
                <input
                  type="text"
                  required
                />
              </label>
              <label>
              Device Name
                <input
                  type="text"
                  required
                />
              </label>
              <label>
               Device Location
                <input
                  type="text"
                  required
                />
              </label>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={()=>{SetIsDeviceDetailOpen(false)}} >
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
