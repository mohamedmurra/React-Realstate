import { Delete, Edit, Preview } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import PrivateApi from '../../utils/private'

function RoomActions({ params }) {
  const navigate = useNavigate()
  const {
    aria,
    property_type,
    building_type,
    title,
    price,
    description,
    num_rooms,
    rent_type,
    space,
    slug,
    status,
    cover,
    bathrooms,
    Agent,
    long,
    lati,
  } = params.row
  const ari = aria.id
  const agen = Agent?.id
  const property_typ = property_type.id
  const building_typ = building_type.id
  const rent_typ = rent_type?.id
  const {
    dispatch,
    state: { user },
  } = useContext(GlobalAuth)

  const Editing = () => {
    dispatch({ type: 'start_edit' })
    dispatch({ type: 'reset_updated_room' })
    dispatch({ type: 'reset_rooms' })
    dispatch({
      type: 'update_detail',
      payload: {
        aria: ari,
        property_type: property_typ,
        building_type: building_typ,
        title,
        price,
        description,
        num_rooms,
        rent_type: rent_typ,
        space,
        slug,
        status,
        cover,
        bathrooms,
        Agent: agen,
        lati,
        long,
      },
    })
    dispatch({
      type: 'updated_room',
      payload: { editor: user.id },
    })
    navigate('/admin-panel/addproperty')
  }

  const hande = async () => {
    dispatch({ type: 'start_loading' })
    try {
      await PrivateApi.delete(`api/home/property/update/${slug}/`)
      dispatch({ type: 'end_loading' })
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'success',
          message: 'Property Been Removed',
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
      <Tooltip title='View Property Detail'>
        <IconButton
          onClick={() => {
            navigate(`/detail/${slug}`)
          }}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title='Edit Property'>
        <IconButton
          onClick={() => {
            Editing()
          }}
        >
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete this Property'>
        <IconButton onClick={() => hande()}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default RoomActions
