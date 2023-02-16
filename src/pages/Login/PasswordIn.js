import React, { useState } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const PasswordIn = ({
  handelChange,
  passwordRef,
  name = 'password',
  id = 'password',
  label = 'كلمة المرور',
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const handlclick = () => setShowPassword(!showPassword)
  const momouse = (e) => e.preventDefault()
  return (
    <TextField
      margin='normal'
      veriant='standard'
      name={name}
      id={id}
      label={label}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      onChange={handelChange}
      inputRef={passwordRef}
      required
      inputProps={{ minLength: 6 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handlclick} onMouseDown={momouse}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default PasswordIn
