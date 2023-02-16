import { CardMedia, Typography } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/fetching'
import TeamCard from '../TeamCard'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { GlobalAuth } from '../UserContext/Provider'
import moment from 'moment'

const BlogDetail = () => {
  const { dispatch } = useContext(GlobalAuth)
  const [blog, setblog] = useState({})
  const post = useParams()
  const getBlogD = async () => {
    try {
      dispatch({ type: 'start_loading' })
      let { data } = await api.get(`/api/blog/${post.blogID}/`)
      setblog(data)
      dispatch({ type: 'end_loading' })
    } catch (error) {
      if (!error?.response) {
        dispatch({ type: 'end_loading' })
        dispatch({
          type: 'alert',
          payload: {
            open: true,
            severity: 'error',
            message: 'No Server Response',
          },
        })
      }
      dispatch({ type: 'end_loading' })
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'error',
          message: error.response.statusText,
        },
      })
    }
  }

  useEffect(() => {
    document.title = 'تفاصيل المنشور'
    getBlogD()
  }, [])

  const member = blog.auther ? blog.auther : {}

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8'>
          <Typography
            style={{ color: 'orangered', marginTop: 20 }}
            variant='h4'
            component='h2'
          >
            {blog.title}
          </Typography>
          <div className='blog-post-meta'>
            <CardMedia
              style={{ marginTop: 10 }}
              component='img'
              height='450'
              image={blog.image}
            />
            <CalendarMonthIcon
              style={{ color: 'orangered', fontSize: '1.2rem' }}
            />
            {moment(blog.created).format('YYYY-MM-DD HH:mm')}
          </div>
          <p style={{ marginTop: 20 }}>{blog.description}</p>
        </div>
        <div className='col-md-4'>
          <div className=''>
            <Typography
              style={{ marginTop: 30 }}
              textAlign='center'
              variant='h5'
              component='h3'
            >
              الكاتب
            </Typography>
            <TeamCard member={member} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
