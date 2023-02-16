import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useState, useContext } from 'react'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import { Navigate, useNavigate } from 'react-router-dom'
import api from '../../utils/fetching'
import { useEffect } from 'react'

function ResetPass() {
  const {
    state: { user },
    dispatch,
  } = useContext(GlobalAuth)
  const Navigations = useNavigate()
  const [email, setemail] = useState('')
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify(email)
  const sending = async () => {
    try {
      api.post('auth/users/reset_password/', body, config)
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'success',
          message: 'Check Your Email to finsh Reset',
        },
      })
      Navigations('/')
    } catch (error) {
     
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'error',
          message: error?.response?.statusText,
        },
      })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    sending()
  }
  useEffect(() => {
    document.title = 'تغير كلمة المرور'
  }, [])

  return (
    <Container sx={{ mt: 5, minHeight: '76vh' }}>
      {user ? (
        <Navigate to='/' />
      ) : (
        <>
          <Typography variant='h4'>
            :أدخل الأيميل لأسترجاع كلمة المرور
          </Typography>
          <form onSubmit={(e) => onSubmit(e)}>
            <div style={{ marginTop: 4 }} className='form-group'>
              <input
                className='form-control'
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <Button sx={{ mt: 3 }} variant='contained' type='submit'>
              Reset Password
            </Button>
          </form>
        </>
      )}
    </Container>
  )
}

export default ResetPass
