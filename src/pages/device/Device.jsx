import React from "react";
import "./Device.css";
import Sidebar from "../../component/Sidebar/Sidebar";
import Footer from "../../component/footer/Footer";
import emd from "../../assets/asset4.png";
export default function Device() {
  return (
    <>
      <div className="device-page">
        <div className="device-sidebar">
          <Sidebar />
        </div>
        <div className="device-main">
          {/* <h2>Devices</h2> */}

          <div className="device-info">
            <h3 className="device-lead">Energy Monitoring Device</h3>
            <section className="device-img">
              <figure>
                <div>
                <img src={emd} alt="emdDevice" width={"400px"} height={'200px'} />

                </div>
              <figcaption>Efficient energy management is now at your fingertips with
                real-time monitoring and control to optimize consumption. Our
                smart demand monitoring devices help track and manage peak
                energy usage with precision. Seamlessly integrate multiple
                devices for a comprehensive view of energy insights across all
                your locations.</figcaption>
              </figure>
              
            </section>
          </div>
        </div>
        <footer className="device-footer">
          <Footer />
        </footer>
      </div>
    </>
  );
}
