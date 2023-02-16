import React, { useState, useContext, useRef, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  DialogActions,
  Typography,
} from '@mui/material'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import { Close, Send } from '@mui/icons-material'
import PasswordIn from './PasswordIn'
import Googlelog from './Googlelogin'
import api from '../../utils/fetching'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'

const Login = () => {
  const initialState = {
    email: '',
    username: '',
    phone_number: '',
    password: '',
    ConfirmPassword: '',
  }
  const {
    state: { openLoggedIn },
    dispatch,
  } = useContext(GlobalAuth)
  const [title, setTitle] = useState('تسجيل الدخول')
  const [isRegister, setisRegister] = useState(false)
  const [formData, setformData] = useState(initialState)
  const nameRef = useRef()
  const emailRef = useRef()
  const firstRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const registerF = async ({ email, pwr, username, phone_number, con_pwr }) => {
    dispatch({ type: 'start_loading' })
    try {
      await api.post(`auth/users/`, {
        email: email,
        password: pwr,
        username: username,
        phone_number: phone_number,
        re_password: con_pwr,
      })
      dispatch({ type: 'end_loading' })
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'success',
          message: 'Registerd successfully ',
        },
      })
      dispatch({ type: 'close_login' })
      setisRegister(false)
    } catch (error) {
      dispatch({ type: 'end_loading' })
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
  const loginF = async ({ email, pwr }) => {
    try {
      dispatch({ type: 'start_loading' })
      let { data } = await api.post(`api/token/`, {
        email: email,
        password: pwr,
      })
      dispatch({ type: 'end_loading' })
      const deco = jwt_decode(data.access)

      dispatch({ type: 'close_login' })
      dispatch({
        type: 'update-user',
        payload: {
          access: data.access,
          refresh: data.refresh,
        },
      })
      const res = await api.get(`viewset/profile/${deco.user_id}/`, {
        headers: { Authorization: `Bearer ${data.access}` },
      })
      dispatch({
        type: 'update-user',
        payload: res.data,
      })
    } catch (error) {
      dispatch({ type: 'end_loading' })
      if (error?.response?.status === 401) {
        dispatch({
          type: 'alert',
          payload: {
            open: true,
            severity: 'error',
            message: 'wrong email of password',
          },
        })
      } else {
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
  }

  useEffect(() => {
    isRegister ? setTitle(' حساب جديد') : setTitle('تسجيل الدخول')
  }, [isRegister])

  const handelChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    })
  }

  const handelSubmit = (e) => {
    e.preventDefault()
    if (!isRegister) {
      loginF({ email: formData.email, pwr: formData.password })
    }
    if (isRegister && formData.password === formData.ConfirmPassword) {
      registerF({
        username: formData.username,
        email: formData.email,
        pwr: formData.password,
        phone_number: formData.phone_number,
        con_pwr: formData.ConfirmPassword,
      })
    }
    if (isRegister && formData.password !== formData.ConfirmPassword) {
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'error',
          message: 'password dont match',
        },
      })
    }
  }

  return (
    <Dialog
      open={openLoggedIn}
      onClose={() => dispatch({ type: 'close_login' })}
    >
      <DialogTitle>
        {title}
        <IconButton
          onClick={() => dispatch({ type: 'close_login' })}
          sx={{ position: 'absolute', top: 8, right: 8, color: 'grey' }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handelSubmit}>
        <DialogContent dividers>
          <DialogContentText>أدخل بياناتك بالأسفل</DialogContentText>
          <TextField
            autoFocus
            margin='normal'
            veriant='standard'
            id='email'
            name='email'
            label='أيميل'
            type='email'
            fullWidth
            onChange={handelChange}
            inputRef={emailRef}
            inputProps={{ minLength: 6 }}
            required
          />
          {isRegister && (
            <>
              <TextField
                margin='normal'
                veriant='standard'
                id='username'
                name='username'
                label='أسم المستخدم'
                type='text'
                fullWidth
                onChange={handelChange}
                inputRef={nameRef}
                inputProps={{ minLength: 4 }}
                required
              />
              <TextField
                margin='normal'
                veriant='standard'
                id='phone_number'
                name='phone_number'
                label='رقم الهاتف'
                type='text'
                fullWidth
                onChange={handelChange}
                inputRef={firstRef}
                required
              />
            </>
          )}

          <PasswordIn {...{ passwordRef, handelChange }} />
          {isRegister && (
            <PasswordIn
              handelChange={handelChange}
              name='ConfirmPassword'
              id='ConfirmPassword'
              label='تأكيد كلمة المرور'
              passwordRef={passwordConfirmRef}
            />
          )}
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button type='submit' variant='contained' endIcon={<Send />}>
              تأكيد
            </Button>
            {!isRegister && (
              <Link
                onClick={() => dispatch({ type: 'close_login' })}
                style={{ textDecoration: 'none', color: 'rgb(185, 5, 59)' }}
                to='/passwordreset'
              >
                نسيت كلمة المرور ؟
              </Link>
            )}
          </DialogActions>
          <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
            <Button onClick={() => setisRegister(!isRegister)}>
              {isRegister ? 'سجل الدخول' : 'سجل حساب جديد'}
            </Button>
            {isRegister ? 'لديك حساب ؟' : 'ليس لديك حساب ؟'}
          </DialogActions>
          <DialogActions sx={{ justifyContent: 'center', p: '24px' }}>
            <Googlelog />
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default Login
