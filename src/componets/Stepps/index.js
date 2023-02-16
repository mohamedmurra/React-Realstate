import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Container,
  Stepper,
  Step,
  StepButton,
  Stack,
  Button,
} from '@mui/material'
import Detail from './Detail'
import Lucation from './Info'
import Cover from './Cover'
import { GlobalAuth } from '../UserContext/Provider'
import { Cancel, Send } from '@mui/icons-material'
import usePrivateRoute from '../../hooks.js/usePrivateRoute'
import { useNavigate } from 'react-router-dom'

const Stepss = ({ link, setselected }) => {
  const [activeStep, setactiveStep] = useState(0)
  const [ready, setready] = useState(false)
  const navigate = useNavigate()
  const {
    state: { detail, editing, user, room_filds },
    dispatch,
  } = useContext(GlobalAuth)
  const PrivateApi = usePrivateRoute()
  const [steps, setsteps] = useState([
    { label: 'Detail', completed: false },
    { label: 'Info', completed: false },
    { label: 'Cover & Lucation', completed: false },
  ])

  const hdclick = () => {
    if (activeStep < steps.length - 1) {
      setactiveStep((activeStep) => activeStep + 1)
    } else {
      const ss = finsh()
      setactiveStep(ss)
    }
  }
  const setComplete = (index, status) => {
    setsteps((steps) => {
      steps[index].completed = status
      return [...steps]
    })
  }

  const hddisabeld = () => {
    if (activeStep < steps.length - 1) return false
    const index = finsh()
    if (index !== -1) return false
    return true
  }

  const finsh = () => {
    return steps.findIndex((step) => !step.completed)
  }
  const getdata = async () => {
    dispatch({ type: 'start_loading' })
    try {
      const { data } = await PrivateApi.get('api/home/searsh-filter/')
      dispatch({ type: 'update_lucation', payload: data.lucation })
      dispatch({ type: 'update_buildings', payload: data.buildings })
      dispatch({ type: 'update_purp', payload: data.purp })
      dispatch({ type: 'update_rent_time', payload: data.rent_time })
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

  useEffect(() => {
    getdata()
    setselected(link)
    dispatch({ type: 'update_detail', payload: { Agent: user.id } })
  }, [])

  useEffect(() => {
    document.title = editing ? 'تعديل العقار' : 'أضافة عقار'
    if (
      detail.num_rooms > 0 &&
      detail.bathrooms > 0 &&
      detail.price > 0 &&
      detail.space > 0 &&
      detail.title.length > 5 &&
      detail.description.length > 10
    ) {
      if (!steps[0].completed) setComplete(0, true)
    } else {
      setComplete(0, false)
    }
    if (detail.building_type && detail.property_type && detail.aria) {
      if (!steps[1].completed) setComplete(1, true)
    } else {
      setComplete(1, false)
    }
    if (detail.cover && detail.slug.length > 5) {
      if (!steps[2].completed) setComplete(2, true)
    } else {
      setComplete(2, false)
    }
    if (steps[0].completed && steps[1].completed && steps[2].completed) {
      setready(true)
    }
  }, [detail, steps])

  const here = async () => {
    dispatch({ type: 'start_loading' })
    try {
      await PrivateApi.post('api/home/add-house/', detail, {
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
          message: 'Property been added Successffuly',
        },
      })
      dispatch({
        type: 'reset_rooms',
      })
      navigate('/admin-panel/propertes/')
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

  const edhere = async () => {
    dispatch({ type: 'start_loading' })

    try {
      await PrivateApi.patch(
        `api/home/property/update/${detail.slug}/`,
        room_filds,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      dispatch({ type: 'end_loading' })
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'success',
          message: 'Property been updated Successffuly',
        },
      })
      dispatch({
        type: 'reset_rooms',
      })
      dispatch({
        type: 'reset_updated_room',
      })
      dispatch({ type: 'end_edit' })
      navigate('/admin-panel/propertes')
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

  const handelCancel = () => {
    dispatch({
      type: 'reset_rooms',
    })
    dispatch({
      type: 'reset_updated_room',
    })
    dispatch({ type: 'end_edit' })
    navigate('/admin-panel/propertes')
  }

  return (
    <Container sx={{ my: 2 }}>
      <Stepper
        sx={{ mb: 3 }}
        alternativeLabel
        nonLinear
        activeStep={activeStep}
      >
        {steps?.map((stesp, index) => (
          <Step key={stesp.label} completed={stesp.completed}>
            <StepButton onClick={() => setactiveStep(index)}>
              {stesp.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box>
        {
          {
            0: <Detail />,
            1: <Lucation />,
            2: <Cover />,
          }[activeStep]
        }
      </Box>
      <Stack
        direction='row'
        sx={{ pt: 2, pb: 7, justifyContent: 'space-around' }}
      >
        <Button
          color='inherit'
          disabled={!activeStep}
          onClick={() => setactiveStep((activeStep) => activeStep - 1)}
        >
          Back
        </Button>
        <Stack
          direction='row'
          sx={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}
        >
          {ready && (
            <>
              <Button
                variant='contained'
                endIcon={<Send />}
                color='primary'
                onClick={editing ? edhere : here}
              >
                {editing ? 'Edit' : 'Add Property'}
              </Button>
              {editing && (
                <Button
                  variant='contained'
                  endIcon={<Cancel />}
                  color='primary'
                  onClick={handelCancel}
                >
                  Cancel
                </Button>
              )}
            </>
          )}
        </Stack>
        <Button color='inherit' disabled={hddisabeld()} onClick={hdclick}>
          Next
        </Button>
      </Stack>
    </Container>
  )
}

export default Stepss
