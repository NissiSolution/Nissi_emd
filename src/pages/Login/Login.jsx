import React,{useState} from 'react'
import'./Login.css'
import axios from 'axios'
import tech from '../../assets/technology.png'
import left from '../../assets/left.jpg'
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function Login() {
    let userid;
   const navigate=useNavigate()
    const [currentUser,setCurrentUser]=useState({})  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser((prev) => ({
          ...prev,
          [name]: value,
        }));
    }
    
  const handleSubmit = async (e) => {
e.preventDefault();
if(currentUser.email===null||currentUser===null){
    alert('enter the email')
}else if(currentUser.password===null){
    alert('enter the password')

}

 

 
const data = {
        requestType: "authAccount",
        data: JSON.stringify({ email: currentUser.email,password:currentUser.password }),
      };
      try{

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
              alert("Request failed: " + response.data);
            } else {
              
              if(response.data==='password-error')
              {
                alert('invalid Password')
              }else if(response.data==='email-error')
                {
                  alert('invalid Password')
                }
                else{
                    
                    userid=response.data.match(/\d+/)[0]
                    const role= await fetchData()
                    localStorage.setItem("userId", userid);
                    localStorage.setItem("role", role === 1 ? "admin" : "user");
                    localStorage.setItem("auth", true);
            
                    // Navigate to the appropriate page
                    role === 1 ? navigate("/admin") : navigate("/dashboard");
                    
                }
           
            }
          } else {
            console.error("Unexpected response code:", response.status);
          }
        } catch (error) {
          console.error("Error during API call:", error);
        }
  


  }

   const fetchData=async()=>{
    const data={
        requestType:'getUser',
        data: JSON.stringify({ userId:userid}),
    }
    try{

        const response = await axios.post("https://nissiemd.co.in/mm.php", data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
         
          
          return await JSON.parse(response.data.role)


        }catch(error){
        console.error(error);
        
        }

   }
  return (
    <>
    <div className="login-page">
        
        <main className="login-main">
             <div className="main-left"><img src={left} alt="" /></div>
             <div className="main-right">
                <div className='header-img'>
                   <img src={tech} alt="tech" />
                </div>
             <div className="login-container">
    <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} >

            <label htmlFor="email">Email</label>
            <div className='wrapper'>
                <div className="icon">
                <CgProfile />
                </div>
            <input type="email" required id='email' name='email' value={currentUser.email||''} placeholder="Enter the email address"  onChange={handleInputChange}/>

            </div>
            <label htmlFor="password">Password</label>
            <div className='wrapper'>
                <div className="icon"> <RiLockPasswordLine />
                </div>
            <input type="password" required id='password' name='password' value={currentUser.password||''} placeholder="Enter the password" onChange={handleInputChange} />

            </div>
            <div className="forgot-password">
                <p>Forgot Your Password?</p>
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
        </form>
        <div className="signup-link">
        <p>Don't have an account? <Link to='/signup'>SignUp</Link></p>

        </div>

    </div>

             </div>
             </div>
        </main>
    </div>
    </>)
}
