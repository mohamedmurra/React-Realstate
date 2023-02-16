import { Delete, Edit, Preview } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import PrivateApi from '../../utils/private'

function BlogActions({ params }) {
  const navigate = useNavigate()
  const { title, auther, catagory, image, description, slug } = params.row
  const ari = catagory.id
  const agen = auther?.id
  const { dispatch } = useContext(GlobalAuth)

  const Editing = () => {
    dispatch({ type: 'start_blog_edit' })
    dispatch({
      type: 'reset_blog',
    })
    dispatch({
      type: 'reset_updated_blog',
    })
    dispatch({
      type: 'update_blog',
      payload: {
        title,
        catagory: ari,
        image,
        description,
        auther: agen,
        slug,
      },
    })

    navigate('/admin-panel/addblog')
  }

  const hande = async () => {
    dispatch({ type: 'start_loading' })
    try {
      await PrivateApi.delete(`api/blog/update/${slug}/`)
      dispatch({ type: 'end_loading' })
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'success',
          message: 'Post Been Removed',
        },
      })
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

  return (
    <Box>
      <Tooltip title='View Post Detail'>
        <IconButton
          onClick={() => {
            navigate(`/blog-detail/${slug}`)
          }}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title='Edit Post'>
        <IconButton
          onClick={() => {
            Editing()
          }}
        >
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete this Post'>
        <IconButton onClick={() => hande()}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default BlogActions
