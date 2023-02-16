import { Check, Save } from '@mui/icons-material'
import { Box, CircularProgress, Fab } from '@mui/material'
import { green } from '@mui/material/colors'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import PrivateApi from '../../utils/private'

function UserActions({ params, rowActivae, setrowActivae }) {
  const [loadingg, setloadingg] = useState(false)
  const [succses, setsuccses] = useState(false)
  const {
    state: { user },
  } = useContext(GlobalAuth)

  useEffect(() => {
    if (rowActivae === params.id && succses) setsuccses(false)
  }, [])

  const hande = async () => {
    setloadingg(true)
    const { user_type, id, is_active } = params.row
    const result = await PrivateApi.patch(`viewset/profile/${id}/`, {
      user_type: user_type,
      is_active: is_active,
    })
    if (result) {
      setsuccses(true)
      setrowActivae(null)
    }
    setloadingg(false)
  }

  const adsd = async () => {
    setloadingg(true)
    const { user_type, id, is_active, is_staff } = params.row
    const result = await PrivateApi.patch(`viewset/profile/${id}/`, {
      user_type: user_type,
      is_active: is_active,
      is_staff: is_staff,
    })
    if (result) {
      setsuccses(true)
      setrowActivae(null)
    }
    setloadingg(false)
  }

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      {succses ? (
        <Fab
          color='primary'
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color='primary'
          onClick={user.user_type === 'ADMIN' ? adsd : hande}
          disabled={params.id !== rowActivae || loadingg}
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <Save />
        </Fab>
      )}
      {loadingg && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  )
}

export default UserActions
