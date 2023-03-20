import { Add, Cancel, Send } from '@mui/icons-material'
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material'
import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import usePrivateRoute from '../../hooks.js/usePrivateRoute'
import { GlobalAuth } from '../UserContext/Provider'

const Lucation = () => {
  const initialBuilding = {
    slug: '',
    name: '',
  }
  const initialAria = {
    slug: '',
    name: '',
  }
  const [Bopen, setBopen] = useState(false)
  const [Aria, setAria] = useState(false)
  const [BformData, setBformData] = useState(initialBuilding)
  const [AformData, setAformData] = useState(initialAria)

  const handelAChange = (e) => {
    setAformData({
      ...AformData,
      [e.target.name]: e.target.value.trim(),
    })
  }
  const handelBChange = (e) => {
    setBformData({
      ...BformData,
      [e.target.name]: e.target.value.trim(),
    })
  }

  const PrivateApi = usePrivateRoute()
  const sendAria = async () => {
    dispatch({ type: 'start_loading' })
    try {
      await PrivateApi.post(`api/home/aria/`, AformData, {
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
          message: 'Add Successffuly',
        },
      })
      setAria(false)
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
      setAria(false)
    }
  }

  const sendbuild = async () => {
    dispatch({ type: 'start_loading' })
    try {
      await PrivateApi.post(`api/home/building/`, BformData, {
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
          message: 'Add Successffuly',
        },
      })
      setBopen(false)
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
      setBopen(false)
    }
  }
  const {
    dispatch,
    state: { detail, buildings, lucation, purp, rent_time, editing },
  } = useContext(GlobalAuth)
  const { t } = useTranslation()

  const handelch = (e) => {
    dispatch({
      type: 'update_detail',
      payload: { [e.target.name]: e.target.value },
    })
  }
  const handeledit = (e) => {
    dispatch({
      type: 'updated_room',
      payload: { [e.target.name]: e.target.value },
    })
    dispatch({
      type: 'update_detail',
      payload: { [e.target.name]: e.target.value },
    })
  }

  return (
    <>
      <Stack
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiFormControl-root': { width: '100%', margin: 2 },
        }}
      >
        <Modal
          aria-labelledby='aria-title'
          open={Aria}
          onClose={() => setAria(false)}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              {t('steps-aria')}
            </Typography>
            <Box>
              <TextField
                autoFocus
                margin='normal'
                veriant='standard'
                id='name'
                name='name'
                label={t('steps-name')}
                fullWidth
                type='text'
                inputProps={{ minLength: 2 }}
                required
                onChange={handelAChange}
              />
              <TextField
                autoFocus
                margin='normal'
                veriant='standard'
                id='slug'
                name='slug'
                label='Slug'
                fullWidth
                type='text'
                inputProps={{ minLength: 2 }}
                required
                onChange={handelAChange}
              />
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                justifyContent: 'space-around',
                gap: 2,
                flexDirection: 'row',
                display: 'flex',
              }}
            >
              <Button
                onClick={sendAria}
                variant='contained'
                endIcon={<Send />}
                color='primary'
              >
                Add
              </Button>
              <Button
                variant='contained'
                endIcon={<Cancel />}
                color='primary'
                onClick={() => setAria(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal
          aria-labelledby='Building-title'
          open={Bopen}
          onClose={() => setBopen(false)}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              {t('steps-build')}
            </Typography>
            <Box>
              <TextField
                autoFocus
                margin='normal'
                veriant='standard'
                id='name'
                name='name'
                label={t('steps-name')}
                fullWidth
                type='text'
                inputProps={{ minLength: 2 }}
                required
                onChange={handelBChange}
              />
              <TextField
                autoFocus
                margin='normal'
                veriant='standard'
                id='slug'
                name='slug'
                label='Slug'
                fullWidth
                type='text'
                inputProps={{ minLength: 2 }}
                required
                onChange={handelBChange}
              />
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                justifyContent: 'space-around',
                gap: 2,
                flexDirection: 'row',
                display: 'flex',
              }}
            >
              <Button
                onClick={sendbuild}
                variant='contained'
                endIcon={<Send />}
                color='primary'
              >
                Add
              </Button>
              <Button
                variant='contained'
                endIcon={<Cancel />}
                color='primary'
                onClick={() => setBopen(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
        <Box sx={{ flexDirection: 'row', gap: 2 }}>
          <FormControl>
            <IconButton onClick={() => setBopen(true)} color='primary'>
              <Add />
            </IconButton>
            <InputLabel>Building Type</InputLabel>
            <Select
              label='Type'
              name='building_type'
              variant='filled'
              value={detail.building_type}
              onChange={editing ? handeledit : handelch}
            >
              {buildings?.map((b) => (
                <MenuItem key={b.slug} value={b.id}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <IconButton onClick={() => setAria(true)} color='primary'>
              <Add />
            </IconButton>
            <InputLabel>{t('steps-side-ar')}</InputLabel>
            <Select
              label='Type'
              name='aria'
              variant='filled'
              value={detail.aria}
              onChange={editing ? handeledit : handelch}
            >
              {lucation?.map((b) => (
                <MenuItem key={b.slug} value={b.id}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ flexDirection: 'row', gap: 2 }}>
          <FormControl>
            <InputLabel>Purpose</InputLabel>
            <Select
              label='Purpose'
              name='property_type'
              variant='filled'
              value={detail.property_type}
              onChange={editing ? handeledit : handelch}
            >
              {purp?.map((b) => (
                <MenuItem key={b.slug} value={b.id}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>{t('steps-Rent')}</InputLabel>
            <Select
              label='Type'
              name='rent_type'
              variant='standard'
              value={detail.rent_type}
              onChange={editing ? handeledit : handelch}
            >
              <MenuItem value={null}>...</MenuItem>
              {rent_time?.map((b) => (
                <MenuItem key={b.slug} value={b.id}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </>
  )
}

export default Lucation
