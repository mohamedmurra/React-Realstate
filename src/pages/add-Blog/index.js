import React, { useContext, useEffect, useState } from 'react'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { Container } from '@mui/system'
import { Cancel, PostAdd } from '@mui/icons-material'
import usePrivateRoute from '../../hooks.js/usePrivateRoute'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/fetching'

const AddBlog = ({ link, setselected }) => {
  const privateRou = usePrivateRoute()
  useEffect(() => {
    setselected(link)
  }, [])
  const navigate = useNavigate()
  const {
    dispatch,
    state: { blog, user, blog_editing, blog_filds },
  } = useContext(GlobalAuth)
  const [cata, setcata] = useState([])

  const getcata = async () => {
    try {
      const { data } = await api.get('api/home/blog-catagory/')
      setcata(data)
    } catch (error) {
      dispatch({
        type: 'alert',
        payload: { open: true, severity: 'error', message: error?.message },
      })
    }
  }

  useEffect(() => {
    document.title = blog_editing ? 'تعديل المنشور ' : 'أضافة منشور'
    getcata()
    dispatch({ type: 'update_blog', payload: { auther: user?.id } })
  }, [user])

  const handelch = (e) => {
    dispatch({
      type: 'update_blog',
      payload: { [e.target.name]: e.target.value },
    })
  }

  const handelupdate = (e) => {
    dispatch({
      type: 'updated_blog',
      payload: { [e.target.name]: e.target.value },
    })
    dispatch({
      type: 'update_blog',
      payload: { [e.target.name]: e.target.value },
    })
    dispatch({
      type: 'updated_blog',
      payload: { editor: user.id },
    })
  }

  const handelSub = (e) => {
    e.preventDefault()
    addblog()
  }

  const canself = () => {
    dispatch({ type: 'reset_blog' })
    dispatch({
      type: 'reset_updated_blog',
    })
    dispatch({ type: 'end_blog_edit' })
    navigate('/admin-panel/blogs')
  }

  const addblog = async () => {
    try {
      dispatch({ type: 'start_loading' })
      await privateRou.post('api/home/add-blog/', blog, {
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
          message: 'Post been added Successffuly',
        },
      })
      dispatch({
        type: 'reset_blog',
      })
      navigate('/admin-panel/blogs')
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

  const update_blog = async () => {
    dispatch({ type: 'start_loading' })
    try {
      await privateRou.patch(`api/blog/update/${blog.slug}/`, blog_filds, {
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
          message: 'Post updated Successffuly',
        },
      })
      dispatch({
        type: 'reset_blog',
      })
      dispatch({
        type: 'reset_updated_blog',
      })
      dispatch({ type: 'end_blog_edit' })
      navigate('/admin-panel/blogs')
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
    <Container sx={{ my: 2 }}>
      <div className='row'>
        <FormControl>
          <InputLabel>Catagory</InputLabel>
          <Select
            label='Type'
            name='catagory'
            variant='filled'
            value={blog.catagory}
            onChange={blog_editing ? handelupdate : handelch}
            required
          >
            {cata?.map((b) => (
              <MenuItem key={b.slug} value={b.id}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className='col-md-6 mb-3 mt-3'>
          <div className='form-group'>
            <input
              required
              accept='image/*'
              onChange={(e) => {
                blog_editing
                  ? dispatch({
                      type: 'updated_blog',
                      payload: { image: e.target.files[0] },
                    })
                  : dispatch({
                      type: 'update_blog',
                      payload: { image: e.target.files[0] },
                    })
              }}
              type='file'
              name='image'
              id='image'
            />
          </div>
        </div>
        <div className='col-md-6 mb-3 mt-3'>
          <div className='form-group'>
            <TextField
              required
              onChange={
                blog_editing
                  ? (e) => {
                      dispatch({
                        type: 'updated_blog',
                        payload: { slug: e.target.value },
                      })
                    }
                  : handelch
              }
              name='slug'
              label='Slug'
              value={blog_filds.slug ? blog_filds.slug : blog.slug}
            />
          </div>
        </div>

        <TextField
          required
          onChange={blog_editing ? handelupdate : handelch}
          name='title'
          label='Title'
          value={blog.title}
        />
        <TextField
          required
          style={{ marginTop: 3 }}
          onChange={blog_editing ? handelupdate : handelch}
          name='description'
          label='Description'
          value={blog.description}
          rows={6}
          multiline
        />
      </div>
      <Button
        onClick={blog_editing ? update_blog : handelSub}
        style={{ margin: 5 }}
        type='submit'
        variant='contained'
        endIcon={<PostAdd />}
      >
        {blog_editing ? 'Update' : 'Post'}
      </Button>
      {blog_editing && (
        <Button
          variant='contained'
          endIcon={<Cancel />}
          color='primary'
          onClick={canself}
        >
          Cancel
        </Button>
      )}
    </Container>
  )
}

export default AddBlog
