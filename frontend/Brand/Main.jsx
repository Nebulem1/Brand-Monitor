import React from 'react'
import Login from '../Brand/Login'
import Signup from '../Brand/Signup'
import DashBoard from './DashBoard'
import { BrowserRouter as BR ,Route,Routes,Link} from 'react-router-dom'
import Chart from './Chart'
import Ai from './Ai'

const Main = () => {
  return (
    <div>
        <BR>
        <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/DashBoard" element={<DashBoard />} />
         <Route path="/chart" element={<Chart/>}/>
         <Route path="/aihelp" element={<Ai/>}/>
        </Routes>    
        </BR>
    </div>
  )
}

export default Main
