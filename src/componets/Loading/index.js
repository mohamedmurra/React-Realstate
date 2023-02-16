import { Backdrop, CircularProgress } from '@mui/material'
import React,{useContext} from 'react'
import { GlobalAuth } from '../UserContext/Provider'

const Loadnig = () => {
  const {state:{loading}} =useContext(GlobalAuth)
  return (
    <Backdrop open={loading}
    sx={{zIndex:(theme)=>theme.zIndex.modal + 1}} >
      <CircularProgress sx={{color:'gold'}}/>
    </Backdrop>
  )
}

export default Loadnig
