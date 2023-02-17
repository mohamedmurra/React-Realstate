import React, { useContext, useRef } from 'react'
import { Close, Send } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import usePrivateRoute from '../../hooks.js/usePrivateRoute'
import { grey } from '@mui/material/colors'
const ImgApi = process.env.REACT_APP_IMAGE_URL

function Profile() {
  const Private = usePrivateRoute()
  const usernameRef = useRef()
  const emailRef = useRef()
  const phoneNumberRef = useRef()
  const first_nameRef = useRef()
  const last_nameRef = useRef()
  const describeRef = useRef()
  const whatssapRef = useRef()
  const {
    state: { OpenProfile, user, profile },
    dispatch,
  } = useContext(GlobalAuth)

  const handelChange = (e) => {
    dispatch({
      type: 'update-user',
      payload: { [e.target.name]: e.target.value },
    })
    dispatch({
      type: 'updated_profile',
      payload: { [e.target.name]: e.target.value },
    })
  }

  const handelImg = (e) => {
    const iFile = e.target.files[0]
    if (iFile) {
      const uri = URL.createObjectURL(iFile)
      dispatch({
        type: 'updated_profile',
        payload: { image: e.target.files[0] },
      })
      dispatch({
        type: 'update_profile',
        payload: { imgUri: uri, open: true },
      })
    }
  }

  const edit = async () => {
    try {
      await Private.patch(`viewset/profile/${user.id}/`, profile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'success',
          message: 'updated Successfully',
        },
      })
      OpenProfile.imgUri &&
        dispatch({
          type: 'update-user',
          payload: { image: OpenProfile.imgUri },
        })
      dispatch({ type: 'reset_profile' })
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
  const handelSubmit = (e) => {
    e.preventDefault()
    edit()
  }
  return (
    user && (
      <Dialog
        open={OpenProfile.open}
        onClose={() => {
          dispatch({ type: 'update_profile', payload: { open: false } })
        }}
      >
        <DialogTitle>
          Profile
          <IconButton
            onClick={() =>
              dispatch({ type: 'update_profile', payload: { open: false } })
            }
            sx={{ position: 'absolute', top: 8, right: 8, color: grey[500] }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handelSubmit}>
          <DialogContent dividers>
            <DialogContentText>Update your Informations</DialogContentText>

            <label htmlFor='profileImage'>
              <input
                style={{ display: 'none' }}
                accept='image/*'
                id='profileImage'
                type='file'
                onChange={handelImg}
              />
              <Avatar
                sx={{ width: 75, height: 75, cursor: 'pointer' }}
                src={
                  OpenProfile.imgUri
                    ? OpenProfile.imgUri
                    : `${ImgApi}${user.image}`
                }
              />
            </label>
            <TextField
              sx={{ marginX: 1 }}
              inputRef={usernameRef}
              autoFocus
              margin='normal'
              veriant='standard'
              id='username'
              name='username'
              type='text'
              label='username'
              value={user.username}
              onChange={handelChange}
              inputProps={{ minLength: 4 }}
              required
            />
            <TextField
              inputRef={emailRef}
              sx={{ marginX: 1 }}
              autoFocus
              margin='normal'
              veriant='standard'
              id='email'
              name='email'
              type='email'
              label='email'
              value={user.email}
              onChange={handelChange}
              inputProps={{ minLength: 7 }}
              required
            />
            <TextField
              sx={{ marginX: 1 }}
              inputRef={phoneNumberRef}
              autoFocus
              margin='normal'
              veriant='standard'
              id='phone_number'
              name='phone_number'
              type='text'
              label='phone number'
              value={user.phone_number}
              onChange={handelChange}
              inputProps={{ minLength: 7 }}
            />
            <TextField
              inputRef={first_nameRef}
              sx={{ marginX: 1 }}
              margin='normal'
              veriant='standard'
              id='first_name'
              name='first_name'
              type='text'
              label='first name'
              value={user.first_name}
              onChange={handelChange}
              inputProps={{ minLength: 2 }}
            />
            <TextField
              sx={{ marginX: 1 }}
              inputRef={last_nameRef}
              margin='normal'
              veriant='standard'
              id='last_name'
              name='last_name'
              type='text'
              label='last name'
              value={user.last_name}
              onChange={handelChange}
              inputProps={{ minLength: 2 }}
            />
            <TextField
              inputRef={whatssapRef}
              sx={{ marginX: 1 }}
              autoFocus
              margin='normal'
              veriant='standard'
              id='whatssap'
              name='whatssap'
              type='number'
              label='watssap number'
              value={user.whatssap}
              onChange={handelChange}
              inputProps={{ minLength: 7 }}
            />
            <TextField
              sx={{ marginX: 1 }}
              inputRef={describeRef}
              margin='normal'
              veriant='standard'
              id='describe'
              name='describe'
              type='text'
              fullWidth
              label='about me'
              value={user.describe}
              onChange={handelChange}
              inputProps={{ minLength: 2 }}
            />

            <DialogActions>
              <Button type='submit' variant='contained' endIcon={<Send />}>
                Update
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    )
  )
}

export default Profile
