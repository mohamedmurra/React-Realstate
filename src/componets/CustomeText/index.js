import { Check, Pending } from '@mui/icons-material'
import { TextField,InputAdornment } from '@mui/material'
import React,{useState,useContext} from 'react'
import { GlobalAuth } from '../UserContext/Provider'

const CustomeText = ({minProp,option={},minLen}) => {
 const [edit, setEdit] = useState(false)
 const [error, seterror] = useState(false)
 const [sucsess, setsucsess] = useState(false)
 const {dispatch,state:{editing}} = useContext(GlobalAuth)

  const handeledit = (e) => {
    dispatch({
      type: 'updated_room',
      payload: { [e.target.name]: e.target.value },
    })
    dispatch({
      type: 'update_detail',
      payload: { [e.target.name]: e.target.value },
    })
    if (!edit) setEdit(true)
    clearTimeout(timer)
    timer = setTimeout(() => {
      setEdit(false)
      if (e.target.value.length < minLen) {
        if (!error) seterror(true)
        if (sucsess) setsucsess(false)
      } else {
        if (error) seterror(false)
        if (!sucsess) setsucsess(true)
      }
    }, 1000)
  }

  let timer
 const handelch=(e)=>{
  dispatch({type:'update_detail',payload:{[e.target.name]:e.target.value}})
  if(!edit)setEdit(true)
  clearTimeout(timer)
  timer=setTimeout(() => {
   setEdit(false)
   if (e.target.value.length < minLen) {
    if(!error)seterror(true)
    if(sucsess)setsucsess(false)
   }
   else{
    if(error)seterror(false)
    if(!sucsess)setsucsess(true)
   }
  }, 1000);
 }
 
  return (
    <TextField
      {...minProp}
      {...option}
      error={error}
      helperText={error && `This field length must be ${minLen}`}
      color={sucsess ? 'success' : 'primary'}
      variant='outlined'
      onChange={editing ? handeledit :handelch}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            {edit ? (
              <Pending sx={{ height: 70 }} />
            ) : (
              sucsess && <Check sx={{ color: 'green' }} />
            )}
          </InputAdornment>
        ),
      }}
    />
  )
}

export default CustomeText
