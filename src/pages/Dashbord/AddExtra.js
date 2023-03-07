import { CheckBox, Send } from '@mui/icons-material'
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import usePrivateRoute from '../../hooks.js/usePrivateRoute'

function AddExtra({ link, setselected }) {
  const [ids, setids] = useState(null)
  const [propert, setpropert] = useState([])
  const [text, settext] = useState('')
  const [info, setinfo] = useState([])
  const Private = usePrivateRoute()
  const { dispatch } = useContext(GlobalAuth)

  useEffect(() => {
    setselected(link)
    getpro()
  }, [])

  useEffect(() => {
    document.title = 'أضافة تفاصيل للعقار'
    if (ids) {
      getinfo()
    }
  }, [ids])

  const deleteextra = async (id) => {
    try {
      await Private.delete(`viewset/extra/${id}`)
      setinfo((prev) => [...prev.filter((p) => p.id !== id)])
    } catch (error) {
      dispatch({
        type: 'alert',
        payload: { open: true, severity: 'error', message: error?.message },
      })
    }
  }

  const getinfo = async () => {
    dispatch({ type: 'start_loading' })
    try {
      let { data } = await Private.get(`api/home/property/${ids.slug}/`)
      setinfo(data.info)
      dispatch({ type: 'end_loading' })
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

  const getpro = async () => {
    dispatch({ type: 'start_loading' })
    try {
      const { data } = await Private.get('api/home/admin/images/')
      setpropert(data)
      dispatch({ type: 'end_loading' })
    } catch (error) {
      dispatch({ type: 'end_loading' })
      dispatch({
        type: 'alert',
        payload: { open: true, severity: 'error', message: error?.message },
      })
    }
  }

  const addInfo = async () => {
    try {
      const { data } = await Private.post('api/home/add-info/', {
        name: text,
        proper: ids.id,
      })
      setinfo((prev) => [...prev, data])
      settext('')
    } catch (error) {
      settext('')
      dispatch({
        type: 'alert',
        payload: { open: true, severity: 'error', message: error?.message },
      })
    }
  }
  return (
    <Container >
      <Typography
        variant='h5'
        component='h5'
        sx={{
          textAlign: 'center',
          mb: 3,
        }}
      >
        Add Extra info for property
      </Typography>
      <Box
        sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
      >
        <FormControl sx={{ width: 300, mb: 5 }}>
          <InputLabel>Choose Property</InputLabel>
          <Select
            label='Type'
            variant='filled'
            value={ids}
            onChange={(e) => {
              setids(e.target.value)
            }}
            required
          >
            {propert?.map((b) => (
              <MenuItem key={b.id} value={b}>
                {b.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {ids && (
        <Stack
          direction='row'
          sx={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}
        >
          <TextField
            variant='outlined'
            onChange={(e) => settext(e.target.value)}
            required
            value={text}
            title='Name'
          />
          <Button
            variant='contained'
            endIcon={<Send />}
            color='primary'
            onClick={() => addInfo()}
            size='small'
          >
            Add
          </Button>
        </Stack>
      )}
      <Stack
        direction='row'
        sx={{
          flexDirection: 'row',
          gap: 2,
          display: 'flex',
          mt: 5,
        }}
      >
        {info?.map(({ name, id }) => (
          <div key={id}>
            <Typography variant='p' component='h6'>
              <IconButton onClick={() => deleteextra(id)}>
                <CheckBox style={{ color: 'orangered' }} />
              </IconButton>
              {name}
            </Typography>
          </div>
        ))}
      </Stack>
    </Container>
  )
}

export default AddExtra
