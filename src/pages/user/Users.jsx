import React,{useState} from 'react'
import Sidebar from '../../component/Sidebar/Sidebar'
import Footer from '../../component/footer/Footer'
import { TbUserSquareRounded } from "react-icons/tb";
import { TbUserEdit } from "react-icons/tb";
import { GrFormView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import './Users.css'
export default function Users() {
    const[isAddOpen,setIsAddOpen]=useState(false)
    const [editIsOpen,setEditOpen]=useState(false)
    const [editId,setEditId]=useState()
    const [viewIsOpen,setViewIsOpen]=useState()
    const [currentUser,setCurrentUser]=useState()
    const editModel=(user={},Id=null)=>{
      setEditOpen(true)
      if(user)
      {
        setCurrentUser(user)
      setEditId(Id)

      }

    }
    const viewModel=(user={},Id=null)=>{
      setViewIsOpen(true)
      if(user){
        setCurrentUser(user)
        setEditId(Id) 
      }

    }
    const openModel=()=>{
        setIsAddOpen(true)
    }
    const closeModel=()=>{
        setIsAddOpen(false)
    }


  return (
    <>
    <div className="users-page">
        <div className="users-sidebar">
            <Sidebar/>
        </div>
        <div className="users-main">
           <div className="users-header">
            <div className="header-lead">
            <TbUserSquareRounded className='user-icons'/>
           <h2>Users</h2> 
            </div>
            <div className="header-side">
                <button className='btn-edit btn' onClick={openModel}>AddUsers</button>
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
                    <tr>
                    <td>1</td>
                    <td>Name</td>
                    <td>des</td>
                    <td>Company</td>
                    <td><GrFormView className='action-icons' onClick={viewModel}/></td>
                    <td><TbUserEdit  className='action-icons'  onClick={editModel}/> &nbsp; &nbsp;<MdDeleteForever className='action-icons' onClick={viewModel} /></td>
                    </tr>
                </tbody>
            </table>
           </div>
           {isAddOpen&&(
            <>
            <div className="modal-overlay ">
                <div className="modal add-users-modal">
                    <form action="" className='add-users' >
                     <h3>Add users</h3>
              <label>
               UserName:
                <input
                  type="text"
                  required
                />
              </label>
              <label>
              Designation:
                <input
                  type="text"
                  required
                />
              </label>
              <label>
              Company Name:
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
              <label>
               NewPassword:
                <input
                  type="password"
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
            </>
           )}
           {editIsOpen&&(<>
            <div className="modal-overlay ">
                <div className="modal add-users-modal">
                    <form action="" className='add-users' >
                     <h3>Edit users</h3>
              <label>
               UserName:
                <input
                  type="text"
                  required
                />
              </label>
              <label>
              Designation:
                <input
                  type="text"
                  required
                />
              </label>
              <label>
              Company Name:
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
              <label>
               Password:
                <input
                  type="password"
                  required
                />
              </label>
                    <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={()=>{setEditOpen(false)}} >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
                    </form>
                </div>
            </div>
           
           </>)}
           {viewIsOpen&&(
            <>
            <div className="modal-overlay">
              <div className="modal users-view">
                <h2>User Details</h2>
                <div className="users-view-details">
                  <p><strong>Name:</strong> Name</p>
                  <p><strong>Designation:</strong> CCC</p>
                  <p><strong>CompanyName:</strong >a</p>
                  <p><strong>Email:</strong> aaa</p>
                  <p><strong>Phone:</strong> 21111</p>
                </div>
                <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={()=>{setViewIsOpen(false)}} >
                  Cancel
                </button>
                </div>
              </div>
              
            </div>
            </>
           )}
        </div>
        <div className="users-footer">
            <Footer/>
        </div>
    </div>
    
    </>
  )
}
