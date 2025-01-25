import React, { useEffect, useState } from "react";
import Sidebar from "../../component/Sidebar/Sidebar";
import Footer from "../../component/footer/Footer";
import { TbUserSquareRounded } from "react-icons/tb";
import { TbUserEdit } from "react-icons/tb";
import { GrFormView } from "react-icons/gr";
// import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import "./Users.css";
export default function Users() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editIsOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState();
  const [viewIsOpen, setViewIsOpen] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [users, setUsers] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const editModel = (user = {}, Id = null) => {
    setCurrentUser({
      ...user,
      password: "" // Clear the password when opening the edit modal
    });
    setEditId(Id);
    setEditOpen(true);
  };
  const viewModel = (user = {}) => {
    setCurrentUser(user);
    setViewIsOpen(true);

  };
  const openModel = () => {
    setCurrentUser({}); 
    setIsAddOpen(true);
    
  };
  const closeModel = () => {

    setCurrentUser({}); 

    setIsAddOpen(false);
  };

  const fetchUser = async () => {
    const data = {
      requestType: "getAllUser",
    };

    try {
      const response = await axios.post("https://nissiemd.co.in/mm.php", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // Handle response
      if (response.data) {
        setUsers(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [editId]);
  // console.log(users);
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      requestType: "updateUser",
      data: JSON.stringify({
        userId: editId,
        username: currentUser.username,
        designation: currentUser.designation,
        company: currentUser.company,
        email: currentUser.email,
        password: isPasswordVisible ? currentUser.password : undefined, 
        phone: currentUser.phone,
        active:'1',
        updatedOn: Date.now()
      }),
    };
  
    try {
      const response = await axios.post("https://nissiemd.co.in/mm.php", updatedUser, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      if (response.status === 200) {

       
          if(response.data)
          {
            alert("User updated successfully!");
            setEditOpen(false);
           await fetchUser()// Close the modal after successful update

            currentUser('')
          }
          else{
            alert('failure')
          }
        ; // Refresh the users list
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();
  
    const newUser = {
      requestType: "createAccount",
      data: JSON.stringify({
        username: currentUser.username,
        designation: currentUser.designation,
        company: currentUser.company,
        email: currentUser.email,
        phone: currentUser.phone,
        password: currentUser.password,
        active:'1',
        createdOn: Date.now(),
      }),
    };
  
    try {
      const response = await axios.post("https://nissiemd.co.in/mm.php", newUser, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      if (response.status === 200) {
        await fetchUser(); // Refresh the users list
         setIsPasswordVisible(false)
        alert("User added successfully!");
        setIsAddOpen(false);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  
  return (
    <>
      <div className="users-page">
        <div className="users-sidebar">
          <Sidebar />
        </div>
        <div className="users-main">
          <div className="users-header">
            <div className="header-lead">
              <TbUserSquareRounded className="user-icons" />
              <h2>Users</h2>
            </div>
            <div className="header-side">
              <button className="btn-edit btn" onClick={openModel}>
                AddUsers
              </button>
            </div>
          </div>
          <div className="users-table">
            <table>
              <thead>
                <th>SL.NO</th>
                <th>Name</th>
                <th>Designation</th>
                <th>CompanyName</th>
                <th>View</th>
                <th>Actions</th>
              </thead>
              <tbody>
                {users&&
                  users?.map((user,index) => (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{user.username}</td>
                      <td>{user.designation}</td>
                      <td>{user.company}</td>
                      <td>
                        <GrFormView
                          className="action-icons"
                          onClick={()=>{viewModel(user)}}
                        />
                      </td>
                      <td>
                        <TbUserEdit
                          className="action-icons"
                          onClick={()=>{editModel(user,user.id)}}
                        />{" "}
                        {/* &nbsp; &nbsp;
                        <MdDeleteForever
                          className="action-icons"
                          onClick={viewModel}
                        /> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {isAddOpen && (
            <>
              <div className="modal-overlay ">
                <div className="modal add-users-modal">
                  <form action="" className="add-users" onSubmit={handleAddSubmit}>
                    <h3>Add users</h3>
                    <label>
                      UserName:
                      <input type="text" required   
                      value={currentUser?.username || ""}
                      onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
                      />
                    </label>
                    <label>
                      Designation:
                      <input type="text" required 
                      value={currentUser?.designation || ""}
                      onChange={(e) => setCurrentUser({ ...currentUser, designation: e.target.value })}/>
                    </label>
                    <label>
                      Company Name:
                      <input type="text" required 
                      value={currentUser?.company|| ""}
                      onChange={(e) => setCurrentUser({ ...currentUser, company: e.target.value })}/>
                    </label>
                    <label>
                      Email:
                      <input type="email" required 
                      value={currentUser?.email || ""}
                      onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}/>
                    </label>
                    <label>
                      Phone:
                      <input type="text" required 
                    
                      value={currentUser?.phone || ""}
                      onChange={(e) => setCurrentUser({ ...currentUser,phone: e.target.value })}/>
                    </label>
                    <label>
                      Password:
                      <input type="password" required    
                      minLength={'8'}
                      value={currentUser?.password || ""}
                      onChange={(e) => setCurrentUser({ ...currentUser,password: e.target.value })}/>
                    </label>
                    <div className="modal-actions">
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={closeModel}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="save-btn">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
          {editIsOpen && (
            <>
              <div className="modal-overlay ">
                <div className="modal add-users-modal">
                  <form action="" className="add-users" onSubmit={handleEditSubmit}>
                    <h3>Edit users</h3>
                    <label>
                      UserName:
                      <input type="text" required   
                      value={currentUser?.username || ""}
                      onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
                      />
                    </label>
                    <label>
                      Designation:
                      <input type="text" required 
                      value={currentUser?.designation || ""}
                      onChange={(e) => setCurrentUser({ ...currentUser, designation: e.target.value })}/>
                    </label>
                    <label>
                      Company Name:
                      <input type="text" required 
                      value={currentUser?.company|| ""}
                      onChange={(e) => setCurrentUser({ ...currentUser, company: e.target.value })}/>
                    </label>
                    <label>
                      Email:
                      <input type="email" required 
                      value={currentUser?.email || ""}
                      onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}/>
                    </label>
                    <label>
                      Phone:
                      <input type="text" required 
                      value={currentUser?.phone || ""}
                      onChange={(e) => setCurrentUser({ ...currentUser,phone: e.target.value })}/>
                    </label>
                    <label className="password-check">
  <input
    type="checkbox"
    checked={isPasswordVisible||false}
    onChange={(e) => setIsPasswordVisible(e.target.checked)}
  />
  Change Password
</label>
{isPasswordVisible && (
  <label >
    Password:
    <input
      type="password"
      value={currentUser?.password }
      minLength={'8'}
      onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
      required={isPasswordVisible}
    />
  </label>
)}

                    <div className="modal-actions">
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                          setEditOpen(false)
         setIsPasswordVisible(false)

                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="save-btn">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
          {viewIsOpen && (
            <>
              <div className="modal-overlay">
                <div className="modal users-view">
                  <h2>User Details</h2>
                  <div className="users-view-details">
                    <p>
                      <strong>Name:</strong> {currentUser?.username||'Name'}
                    </p>
                    <p>
                      <strong>Designation:</strong>{currentUser?.designation||'ss'}
                    </p>
                    <p>
                      <strong>CompanyName:</strong>{currentUser?.company||'ss'}
                    </p>
                    <p>
                      <strong>Email:</strong> {currentUser?.email||'email@gmail.com'}
                    </p>
                    <p>
                      <strong>Phone:</strong> {currentUser?.phone||'9876543'}
                    </p>
                  </div>
                  <div className="modal-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => {
                        setViewIsOpen(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="users-footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
