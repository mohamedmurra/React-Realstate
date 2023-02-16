import React, { useContext, useState, useRef, useEffect } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Send } from '@mui/icons-material'
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread'
import api from '../../utils/fetching'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const { dispatch } = useContext(GlobalAuth)
  const navigate = useNavigate()
  const nameRef = useRef()
  const emailRef = useRef()
  const subjectRef = useRef()
  const initialState = {
    email: '',
    message: '',
    subject: '',
    name: '',
  }
  const [formData, setformData] = useState(initialState)

  const handelChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    })
  }

  const sub = async () => {
    dispatch({ type: 'start_loading' })
    try {
      await api.post('api/contact/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      dispatch({ type: 'end_loading' })
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'success',
          message: 'Thanks for your message will get back to YOU SOON',
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

  useEffect(() => {
    document.title = 'تفاصيل التواصل بنا'
  }, [])

  const handelSub = (e) => {
    e.preventDefault()
    sub()
  }
  return (
    <div className='container'>
      <div className='row'>
        <Typography
          style={{ marginBottom: 20 }}
          variant='h2'
          component='h4'
          textAlign='center'
        >
          التواصل
        </Typography>
        <div className='col-sm-12'></div>
        <div className='col-sm-12 '>
          <div className='row'>
            <Typography
              style={{ marginBottom: 20 }}
              variant='h5'
              component='h3'
              textAlign='center'
            >
              توأصل معنا عن طريق رسالة
            </Typography>
            <div className='col-md-7'>
              <form onSubmit={handelSub}>
                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <div className='form-group'>
                      <TextField
                        autoFocus
                        margin='normal'
                        veriant='standard'
                        id='name'
                        name='name'
                        label='الأسم'
                        fullWidth
                        type='text'
                        onChange={handelChange}
                        inputRef={nameRef}
                        inputProps={{ minLength: 4 }}
                        required
                      />
                    </div>
                  </div>
                  <div className='col-md-6 mb-3'>
                    <div className='form-group'>
                      <TextField
                        margin='normal'
                        veriant='standard'
                        id='email'
                        name='email'
                        fullWidth
                        label='أيميل'
                        type='email'
                        onChange={handelChange}
                        inputRef={emailRef}
                        inputProps={{ minLength: 4 }}
                        required
                      />
                    </div>
                  </div>
                  <div className='col-md-12 mb-3'>
                    <div className='form-group'>
                      <TextField
                        margin='normal'
                        veriant='standard'
                        id='subject'
                        name='subject'
                        label='الموضوع'
                        type='text'
                        fullWidth
                        onChange={handelChange}
                        inputRef={subjectRef}
                        inputProps={{ minLength: 4 }}
                        required
                      />
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <textarea
                        onChange={handelChange}
                        name='message'
                        className='form-control'
                        cols='45'
                        rows='8'
                        placeholder='الرسالة'
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className='col-md-12 text-center'>
                    <Button
                      style={{ margin: 5 }}
                      type='submit'
                      variant='contained'
                      endIcon={<Send />}
                    >
                      أرسال الرسالة
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className='col-md-5 section-md-t3'>
              <div className='icon-box section-b2'>
                <div className='icon-box-icon'>
                  <span className='bi bi-envelope'></span>
                </div>
                <div className='icon-box-content table-cell'>
                  <div className='icon-box-title'>
                    <h4 className='icon-title'>
                      <MarkEmailUnreadIcon
                        style={{ color: 'orangered', marginRight: 5 }}
                      />
                      معلومات التواصل
                    </h4>
                  </div>
                  <div className='icon-box-content'>
                    <p className='mb-1'>
                      الأيميل :
                      <span className='color-a'>
                        {' '}
                        mohamedmura1995@gmail.com
                      </span>
                    </p>
                    <p className='mb-1'>
                      رقم الهاتف :
                      <span className='color-a'> +249 115616181</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className='icon-box mt-3 section-b2'>
                <div className='icon-box-icon'>
                  <span className='bi bi-geo-alt'></span>
                </div>
                <div className='icon-box-content table-cell'>
                  <div className='icon-box-title'>
                    <h4 className='icon-title'>
                      <LocationOnIcon
                        style={{ color: 'orangered', marginRight: 5 }}
                      />{' '}
                      الموقع
                    </h4>
                  </div>
                  <div className='icon-box-content'>
                    <p className='mb-1'>
                      الخرطوم, الديوم الشرقية,
                      <br /> أبو حمامة
                    </p>
                  </div>
                </div>
              </div>
              <div className='icon-box mt-3'>
                <div className='icon-box-icon'>
                  <span className='bi bi-share'></span>
                </div>
                <div className='icon-box-content table-cell'>
                  <div className='icon-box-title'>
                    <h4 className='icon-title'>Social networks</h4>
                  </div>
                  <div className='icon-box-content'>
                    <div className='socials-footer'>
                      <ul className='list-inline'>
                        <li className='list-inline-item'>
                          <a href='s' className='link-one'>
                            <i className='bi bi-facebook' aria-hidden='true'>
                              <FacebookIcon />
                            </i>
                          </a>
                        </li>
                        <li className='list-inline-item'>
                          <a href='s' className='link-one'>
                            <i className='bi bi-twitter' aria-hidden='true'>
                              <TwitterIcon />
                            </i>
                          </a>
                        </li>
                        <li className='list-inline-item'>
                          <a href='s' className='link-one'>
                            <i className='bi bi-instagram' aria-hidden='true'>
                              <InstagramIcon />
                            </i>
                          </a>
                        </li>
                        <li className='list-inline-item'>
                          <a href='s' className='link-one'>
                            <i className='bi bi-linkedin' aria-hidden='true'>
                              <WhatsAppIcon />
                            </i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
