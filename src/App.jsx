import React from 'react'

import './App.css'
import Login from './pages/Login/Login'

import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Signup from './pages/signup/Signup'
function App() {
  return (
   <Router>
<Routes>
<Route path='/' element={<Login/>}/>
<Route path='/signup' element={<Signup/>}/>
</Routes>
   </Router>
  )
}

export default App
