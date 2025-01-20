import React from 'react'
import './App.css'
import Login from './pages/Login/Login'

import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import Device from './pages/device/Device'
import DeviceView from './pages/device/DeviceView'
import User from './pages/user/User'
function App() {
  return (
   <Router>
<Routes>
<Route index path='/' element={<Login/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/dashboard' element={<Dashboard/>}/>
<Route path='/devices' element={<Device/>}/>
<Route path='/devices/view' element={<DeviceView/>}/>
<Route path='/user' element={<User/>}/>
 </Routes>
   </Router>
  )
}

export default App
