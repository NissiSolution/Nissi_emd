import React,{useState,useEffect} from 'react'
import'./Login.css'
import axios from 'axios'
import tech from '../../assets/ui-design.png'
import left from '../../assets/login3.svg'
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
export default function Login() {
        const navigate = useNavigate(); // Ensure useNavigate is correctly used
    const [currentUser , setCurrentUser ] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser ((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!currentUser.email) {
            alert('Enter the email');
            return;
        } else if (!currentUser.password) {
            alert('Enter the password');
            return;
        }
    
        const data = {
            requestType: "authAccount",
            data: JSON.stringify({ email: currentUser.email, password: currentUser.password }),
        };
    
        try {
            const response = await axios.post("https://nissiemd.co.in/mm.php", data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
    
            if (response.status === 200) {
                if (response.data === "failure") {
                    alert("Request failed: " + response.data);
                } else if (response.data === 'password-error') {
                    alert('Invalid Password');
                } else if (response.data === 'email-error') {
                    alert('Invalid Email');
                } else {
                    const userid = response.data.match(/\d+/)[0];
                    const role = await fetchData(userid);
    
    
                    localStorage.setItem("userId", userid);
                    localStorage.setItem("role", role === '1' ? "admin" : "user");
                    localStorage.setItem("auth", true);
                    
                    navigate('/dashboard')
                   
                }
            } else {
                console.error("Unexpected response code:", response.status);
            }
        } catch (error) {
            console.error("Error during API call:", error);
            alert("Something went wrong. Please try again later.");
        }
    };
    // function navigateBasedOnRole(role) {
    //     const route = role === "1" ? "/admin" : "/dashboard";
    //     navigate(route, { replace: true });
    //   }
    const fetchData = async (userid) => {
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

            // Assuming response.data contains the role
            if(response.data)
            {
              const role = response.data.role; // Adjust based on actual response structure
              localStorage.setItem('user',response.data.username)
              return role
            }
            ;
        } catch (error) {
            console.error(error);
        }
    };
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
            <input type="password" required id='password' minLength={'8'} name='password' value={currentUser.password||''} placeholder="Enter the password" onChange={handleInputChange} />

            </div>
            {/* <div className="forgot-password">
                <p>Forgot Your Password?</p>
              </div> */}
              <button type="submit" className="login-button">
                Login
              </button>
        </form>
        {/* <div className="signup-link">
        <p>Don't have an account? <Link to='/signup'>SignUp</Link></p>
        </div> */}
    </div>             </div>
             </div>
        </main>
    </div>
    </>)
}
