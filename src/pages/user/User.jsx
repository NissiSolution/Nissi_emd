import React,{useState} from 'react'
import './User.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from '../../component/Sidebar/Sidebar'
import Footer from '../../component/footer/Footer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function User() {
    const [user,setUser]=useState()
    const userName=localStorage.getItem('user')
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPassModelOpen,setIsPassModelOpen]=useState(false)
    const userid=localStorage.getItem('userId')
    const [password,setPassword]=useState({current:"",newPassword:"",confirmPassword:""})
    const navigate=useNavigate()
    const openModel=()=>{
        setIsModalOpen(true)
    }

    const closeModel=()=>{
      setPassword('')
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
    
   const fetchUser=async ()=>{
   

      const data = {
        requestType: 'getUser',
        data: JSON.stringify({ userId: userid }),
      };

      try {
          const response = await axios.post("https://nissiemd.co.in/mm.php", data, {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
          });

          // Handle response
          if (response.data) {
             setUser(response.data)
            }
   }
   catch(e){
            console.log(e);
            
   }
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassword ((prev) => ({
        ...prev,
        [name]: value,
    }));
};

  useEffect(()=>{
fetchUser()
  },[userid])
// console.log(user);
const handleEditSubmit = async (e) => {
  e.preventDefault();
  const updatedData = {
      requestType: 'updateUser', 
      data: JSON.stringify({
          userId: userid,
          username: user.username,
          designation: user.designation,
          company: user.company,
          phone: user.phone,
          active:1,
          updatedOn: Date.now(),
      }),
  };

  try {
      const response = await axios.post("https://nissiemd.co.in/mm.php", updatedData, {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
      });

      if (response.status === 200) {
      

          alert('Profile updated successfully');
        
          setUser ((prev) => ({
              ...prev,
              username: user.username,
              designation: user.designation,
              company: user.company,
              phone: user.phone,
          }));
          closeModel(); // Close the modal after successful update

       

      }
  } catch (error) {
      console.error("Error updating user:", error);
  }
};

  const handlePasswordSubmit=async(e)=>{
    e.preventDefault();
    if(password.newPassword !== password.confirmPassword)
    {
     return alert('check the password')
    }

    const updatedData = {
        requestType: 'updatePassword', 
        data: JSON.stringify({
            userId: userid,
            old:password.current,
            newP:password.confirmPassword,
        }),
    };
  
    try {
        const response = await axios.post("https://nissiemd.co.in/mm.php", updatedData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
  
        if (response.status === 200) {
        
          if(response.data)
          {
            alert(response.data)
            setPassword('')
            closeModel(); // Close the modal after successful update
          }
          else{
            alert('failure')
          }
         
  
        }
    } catch (error) {
        console.error("Error updating user:", error);
    }
  }
    document.onclick = handleDocumentClick;
    const Logout=()=>{
      localStorage.clear()
       navigate('/')
    }
  return (
    <>
    <div className="user-page">
        <div className="user-sidebar">
            <Sidebar/>
        </div>
        <div className="user-main">
        <div className="user-header" onClick={(e) => e.stopPropagation()}>
            <h3>Profile</h3>
            <div className="user-action" onClick={handleToggleDropdown}>
                <BsThreeDotsVertical />
            </div>
            {isProfileOpen && (
                <div className="edit-user">
                    <p onClick={openModel}>Edit</p>
                    <p onClick={()=>{setIsPassModelOpen(true)}}>Change Password</p>
                    <p onClick={()=>{Logout()}}>Logout</p>
                </div>
            )}
        </div>
         <div className="user-sides">
         <div className="user-details">
            <div className="user-box">
                <p>UserName</p>
                <p>{user?.username||'name'}</p>
            </div>
        
            <div className="user-box">
                <p>Designation</p>
                <p>{user?.designation}</p>
            </div>
            <div className="user-box">
                <p>CompanyName</p>
                <p>{user?.company}</p>
            </div>
            
            <div className="user-box">
                <p>Email</p>
                <p>{user?.email}</p>
            </div>
            <div className="user-box">
                <p>Phone</p>
                <p>{user?.phone}</p>
            </div>
         </div>
         {/* <div className="user-devices">

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
         </div> */}
         </div>
         
    {isModalOpen&&(<>
           <div className="modal-overlay">
            <div className="modal">
           <h2>Edit Profile</h2>
           <form className='edit-modal' onSubmit={handleEditSubmit}>
           <label>
                                            UserName:
                                            <input
                                                type="text"
                                                required
                                                value={user.username || ''}
                                                onChange={(e) => setUser ({ ...user, username: e.target.value })}
                                            />
                                        </label>
                                        <label>
                                            Designation:
                                            <input
                                                type="text"
                                                required
                                                value={user.designation || ''}
                                                onChange={(e) => setUser ({ ...user, designation: e.target.value })}
                                            />
                                        </label>
                                        <label>
                                            CompanyName:
                                            <input
                                                type="text"
                                                required
                                                value={user.company || ''}
                                                onChange={(e) => setUser ({ ...user, company: e.target.value })}
                                            />
                                        </label>
                                        <label>
                                            Phone:
                                            <input
                                                type="text"
                                                required
                                                value={user.phone || ''}
                                                onChange={(e) => setUser ({ ...user, phone: e.target.value })}
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
                <form action="" className="edit-users" onSubmit={handlePasswordSubmit}>
                <label>
               CurrentPassword:
                <input
                  type="password"
                  name='current'
                  required
                  minLength={'8'}
                  value={password.current||''}
                  onChange={handleInputChange}

                />
              </label>
              <label>
               NewPassword:
                <input
                id='password'
                  type="password"
                  name='newPassword'
                  required
                  minLength={'8'}
                  value={password.newPassword||''}
                  onChange={handleInputChange}

                  
                />
              </label>
              <label>
            ConfirmPassword:
                <input
                  type="password"
                  name='confirmPassword'
                  required
                  minLength={'8'}
                  value={password.confirmPassword||''}
                  onChange={handleInputChange}
                />
              </label>

                <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={()=>{setIsPassModelOpen(false)
                setPassword('') }} >
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
