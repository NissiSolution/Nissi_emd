import React from 'react'
import './App.css'
import Login from './pages/Login/Login'

import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import Device from './pages/device/Device'
function App() {
  return (
   <Router>
<Routes>
<Route index path='/' element={<Login/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/dashboard' element={<Dashboard/>}/>
<Route path='/devices' element={<Device/>}/>
 </Routes>
   </Router>
  )
}

export default App
