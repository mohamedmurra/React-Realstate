import { Button, Container } from '@mui/material'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Navigate, useSearchParams, useNavigate } from 'react-router-dom'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import api from '../../utils/fetching'

function ResetPasswordConfirm() {
  const {
    state: { user },
    dispatch,
  } = useContext(GlobalAuth)
  const Navigations = useNavigate()
  const [searchParams] = useSearchParams()
  const uid = searchParams.get('uid') ? searchParams.get('uid') : null
  const token = searchParams.get('token') ? searchParams.get('token') : null
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
  })
  const reset_password_confirm = async () => {
    try {
      api.post('auth/users/reset_password_confirm/', {
        uid,
        token,
        new_password,
      })
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'success',
          message: 'Password Reset Successfully',
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

  const { new_password, re_new_password } = formData

  const onSubmit = (e) => {
    e.preventDefault()
    if (new_password === re_new_password) reset_password_confirm()
    else
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'error',
          message: 'Password dont match',
        },
      })
  }
  useEffect(() => {
    document.title = ' تأكيد تغير كلمة المرور'
  }, [])

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  if (!uid & !token) {
    return <Navigate to='/' />
  }

  return (
    <Container sx={{ mt: 5, minHeight: '76vh' }}>
      {user ? (
        <Navigate to='/' />
      ) : (
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              placeholder='New Password'
              name='new_password'
              value={new_password}
              onChange={(e) => onChange(e)}
              minLength='6'
              required
            />
          </div>
          <div style={{ marginTop: 2 }} className='form-group'>
            <input
              className='form-control'
              type='password'
              placeholder='Confirm New Password'
              name='re_new_password'
              value={re_new_password}
              onChange={(e) => onChange(e)}
              minLength='6'
              required
            />
          </div>
          <Button variant='contained' sx={{ mt: 3 }} type='submit'>
            Reset Password
          </Button>
        </form>
      )}
    </Container>
  )
}

export default ResetPasswordConfirm
