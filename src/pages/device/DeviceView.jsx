import React from 'react'
import img from '../../assets/asset3.png'
import './DeviceView.css'
import Sidebar from '../../component/Sidebar/Sidebar'
import Footer from '../../component/footer/Footer'
export default function DeviceView() {
  return (
    <>
    <div className="device-view-page">
      <div className="device-view-sidebar">
        <Sidebar/>
      </div>
      <div className="device-view-main">
          <h2> DeviceName</h2>
          <div className="device-view-info">

            <figure className='view-img'>
              <img src={img} alt="" />
            </figure>
            <div className="device-details">
              <p>Device ID</p>
              <p>Device Name</p>
        <p>Device Location:</p>
            </div>
          </div>
          <div className="device-status">
            <div className="active box">
             <div className="box-lead"> Active State</div>
              <span className='state box-sub-lead'>ON</span>
            </div>
            <div className="frequency box">
              <p className="box-lead">Frequency</p>
              <span className='box-sub-lead'>50.50 <span>Hz</span></span>
            </div>
            <div className="active-power box">
              <p className="box-lead">Total Active power</p>
              <span className="box-sub-lead">
                0.0
                <span>Kw</span>
              </span>
            </div>
            <div className="avg-power box">
              <p className="box-lead">Average Power Factor</p>
              <span className="box-sub-lead">
                000 <span></span>
              </span>
            </div>
          </div>
          <div className="device-table-details">
          

            <div className="label">
               <div className="first-label">Voltage R-N</div>
               <div className="second-label">: 200.20V</div>
            </div>
            <div className="label">
               <div className="first-label"> Voltage Y-N</div>
               <div className="second-label">: 256.33 V</div>
            </div>
            <div className="label">
               <div className="first-label">Voltage B-N</div>
               <div className="second-label">: 258.73 V</div>
            </div>
            <div className='space-bar'></div>
            <div className="label">
               <div className="first-label">Voltage R-Y</div>
               <div className="second-label">: 200.20V</div>
            </div>
            <div className="label">
               <div className="first-label"> Voltage Y-B</div>
               <div className="second-label">: 256.33 V</div>
            </div>
            <div className="label">
               <div className="first-label">Voltage B-R</div>
               <div className="second-label">: 258.73 V</div>
            </div>
          </div>
      </div>
      <div className="device-view-footer">
        <Footer/>
      </div>
    </div>
    </>
  )
}
