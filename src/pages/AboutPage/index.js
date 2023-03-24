import {
  Typography,
  Rating,
  TextField,
  Button,
  Paper,
  Box,
  Container,
} from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import { Send } from '@mui/icons-material'
import api from '../../utils/fetching'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import { useNavigate } from 'react-router-dom'
import ControlledAccordions from './about'
import { useTranslation } from 'react-i18next'

const ImgApi = process.env.REACT_APP_IMAGE_URL

const About = () => {
  const { t } = useTranslation()
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
    dispatch({ type: 'start_loading' })
    try {
      let { data } = await api.get(`api/admin/contact/`)
      setadmin(data)
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
    <Container>
      <div className='container'>
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
                      {t('about-admin')}
                    </small>
                  </h3>
                  <p>
                    {' '}
                    {t('about-admin-detail')} +249
                    {admi?.phone_number} {admi?.email}
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
                  {t('about-rating-ti')}
                </Typography>
                <form onSubmit={handelSubmit}>
                  <div style={{ margin: 5 }} className='row'>
                    <div className='col-md-10 mb-3'>
                      <div className='form-group'>
                        <label htmlFor='rating'> {t('about-rate')} : </label>
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
                          label={t('about-name')}
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
                          placeholder={t('about-comment')}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className='col-md-12 mb-3'>
                      <div className='form-group'>
                        <label htmlFor='image'> {t('about-img')} : </label>
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
                        {t('about-butt')}
                      </Button>
                    </div>
                  </div>
                </form>
              </Box>
            </div>
          </div>
        </Paper>
      </div>
    </Container>
  )
}

export default About
