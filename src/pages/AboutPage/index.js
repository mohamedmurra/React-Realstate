import {
  Typography,
  Rating,
  TextField,
  Button,
  Paper,
  Box,
} from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import { Send } from '@mui/icons-material'
import api from '../../utils/fetching'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import { useNavigate } from 'react-router-dom'
import ControlledAccordions from './about'

const url = process.env.REACT_APP_POINT
const ImgApi = process.env.REACT_APP_IMAGE_URL

const About = () => {
  const navigate = useNavigate()
  const { dispatch } = useContext(GlobalAuth)
  const [admi, setadmin] = useState({})

  const initialState = {
    name: '',
    review: null,
    message: '',
    image: null,
  }
  const [formData, setformData] = useState(initialState)
  const handelChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    })
  }
  const getadmin = async () => {
    try {
      dispatch({ type: 'start_loading' })
      let { data } = await api.get(`api/admin/contact/`)
      setadmin(data)
      console.log(data)
      dispatch({ type: 'end_loading' })
    } catch (error) {
      dispatch({ type: 'end_loading' })
      dispatch({
        type: 'alert',
        payload: { open: true, severity: 'error', message: error?.message },
      })
    }
  }
  useEffect(() => {
    document.title = 'حول الموقع'
    getadmin()
  }, [])

  const sen = async () => {
    try {
      dispatch({ type: 'start_loading' })
      await api.post('api/Testemony/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      dispatch({ type: 'end_loading' })
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'success',
          message: 'Thanks for your Review its help up improve our websity',
        },
      })
      navigate('/')
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

  const handelSubmit = (e) => {
    e.preventDefault()
    sen()
  }

  return (
    <>
      <div style={{ minHeight: '79vh' }} className='container'>
        <div
          style={{ margin: 20 }}
          className='row justify-content-center about-info'
        >
          <div className='col-12 col-md-8 '>
            <div className='row'>
              <div className='col-12 col-lg-4'>
                <img
                  src={`${ImgApi}${admi?.image}`}
                  alt='profile'
                  className='img-fluid'
                />
              </div>
              <div className='col-12 col-lg-8'>
                <div className='body-detail'>
                  <h3>
                    {admi?.first_name} {admi?.last_name}
                    <small style={{ fontSize: '1rem', color: 'orangered' }}>
                      {' '}
                      أدمن الموقع
                    </small>
                  </h3>
                  <p>
                    {' '}
                    hello welcome to my websity its build using django and react
                    its for sell if you like to buy it contact me whatsapp +249
                    {admi?.whatssap} email {admi?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Paper style={{ marginTop: 100 }} elevation={3}>
          <div className='row'>
            <div className='col-md-6'>
              <ControlledAccordions />
            </div>

            <div className='col-md-6'>
              <Box style={{ margin: 5 }} elevation={5}>
                <Typography
                  style={{ marginBottom: 30, textDecoration: 'bold' }}
                  component='h1'
                  variant='h6'
                  textAlign='center'
                >
                  أضف تقيمك عن الموقع
                </Typography>
                <form onSubmit={handelSubmit}>
                  <div style={{ margin: 5 }} className='row'>
                    <div className='col-md-10 mb-3'>
                      <div className='form-group'>
                        <label htmlFor='rating'> التقيم : </label>
                        <Rating
                          id='rating'
                          name='review'
                          onChange={handelChange}
                        />
                      </div>
                    </div>
                    <div className='col-md-12 mb-3'>
                      <div className='form-group'>
                        <TextField
                          autoFocus
                          fullWidth
                          margin='normal'
                          veriant='standard'
                          id='name'
                          name='name'
                          label='الأسم'
                          type='text'
                          onChange={handelChange}
                          inputProps={{ minLength: 4 }}
                          required
                        />
                      </div>
                    </div>
                    <div className='col-md-12 mb-3'>
                      <div className='form-group'>
                        <textarea
                          onChange={handelChange}
                          name='message'
                          className='form-control'
                          cols='45'
                          rows='8'
                          placeholder='التعليق'
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className='col-md-12 mb-3'>
                      <div className='form-group'>
                        <label htmlFor='image'> الصورة : </label>
                        <input
                          accept='image/*'
                          onChange={(e) =>
                            setformData({
                              ...formData,
                              image: e.target.files[0],
                            })
                          }
                          type='file'
                          name='image'
                          id='image'
                        />
                      </div>
                    </div>
                    <div className='col-md-12 text-center'>
                      <Button
                        type='submit'
                        variant='contained'
                        endIcon={<Send />}
                      >
                        أضافة تقيم
                      </Button>
                    </div>
                  </div>
                </form>
              </Box>
            </div>
          </div>
        </Paper>
      </div>
    </>
  )
}

export default About
