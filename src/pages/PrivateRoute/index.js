import React,{useContext} from 'react'
import { Outlet,useLocation,Navigate } from 'react-router-dom'
import { GlobalAuth } from '../../componets/UserContext/Provider'

const PrivateRoute = () => {
 const{state:{user}}=useContext(GlobalAuth)
 const lucation =useLocation()
  return (
   user ?
   <Outlet />    
   :
   <Navigate to='unuthorize' />
     
  )
}

export default PrivateRoute
