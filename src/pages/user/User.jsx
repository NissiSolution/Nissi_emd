import React,{useState} from 'react'
import './user.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from '../../component/Sidebar/Sidebar'
import Footer from '../../component/footer/Footer'

export default function User() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPassModelOpen,setIsPassModelOpen]=useState(false)
    const openModel=()=>{
        setIsModalOpen(true)
    }

    const closeModel=()=>{
        setIsModalOpen(false)
    }
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

  return (
    <>
    <div className="user-page">
        <div className="user-sidebar">
            <Sidebar/>
        </div>
        <div className="user-main">
        <div className="user-header" onClick={(e) => e.stopPropagation()}>
            <h2>User</h2>
            <div className="user-action" onClick={handleToggleDropdown}>
                <BsThreeDotsVertical />
            </div>
            {isProfileOpen && (
                <div className="edit-user">
                    <p onClick={openModel}>Edit</p>
                    <p onClick={()=>{setIsPassModelOpen(true)}}>Change Password</p>
                    <p>Logout</p>
                </div>
            )}
        </div>
         <div className="user-sides">
         <div className="user-details">
            <div className="user-box">
                <p>UserName</p>
                <p>User</p>
            </div>
        
            <div className="user-box">
                <p>Designation</p>
                <p>......</p>
            </div>
            <div className="user-box">
                <p>CompanyName</p>
                <p>Nissi</p>
            </div>
            
            <div className="user-box">
                <p>Email</p>
                <p>Email@gmail.com</p>
            </div>
            <div className="user-box">
                <p>Phone</p>
                <p>098765432</p>
            </div>
         </div>
         <div className="user-devices">

            <h3>Devices</h3>
    <div className="user-available-cards">
<div className="user-card">
        <p>Device Id:</p>
        <p>Device Name:</p>
        <p>Device Location:</p>
       </div>
<div className="user-card">
        <p>Device Id:</p>
        <p>Device Name:</p>
        <p>Device Location:</p>
       </div>

    </div>
         </div>
         </div>
         
    {isModalOpen&&(<>
           <div className="modal-overlay">
            <div className="modal">
           <h2>Edit Profile</h2>
           <form className='edit-modal'>
              <label>
               UserName:
                <input
                  type="text"
                  required
                />
              </label>
              <label>
              Email:
                <input
                  type="email"
                  required
                />
              </label>
              <label>
               Phone:
                <input
                  type="text"
                  required
                />
              </label>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeModel} >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
              </form>
            
            </div>
            
           </div>
        </>)
    }
    {isPassModelOpen&&(
        <>
        <div className="modal-overlay">
            <div className="modal">
                <h2>Change Password</h2>
                <form action="" className="edit-users">
                <label>
               CurrentPassword:
                <input
                  type="password"
                  required
                />
              </label>
              <label>
               NewPassword:
                <input
                  type="password"
                  required
                />
              </label>
              <label>
            ConfirmPassword:
                <input
                  type="password"
                  required
                />
              </label>

                <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={()=>{setIsPassModelOpen(false)}} >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
                </form>
            </div>
            
            </div></>
    )}
    
   
        </div>
        <footer className="user-footer">
            <Footer/>
        </footer>
        
    </div>
    
    </>
  )
}
