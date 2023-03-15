import { Typography, Button, Box } from '@mui/material'
import { Container } from '@mui/system'
import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { GlobalAuth } from '../../componets/UserContext/Provider'

const Unuthorize = () => {
  const {
    dispatch,
    state: { user },
  } = useContext(GlobalAuth)

  const openLogin = () => {
    dispatch({ type: 'open_login' })
  }
  const Navigations = useNavigate()
  return (
    <Container>
      {user ? (
        <Navigate to='/' />
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '82vh',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{ mt: -20, color: 'red' }}
            textAlign='center'
            variant='h4'
          >
            Error 401 UnAuthorized
          </Typography>
          <Typography sx={{ mt: 5 }} textAlign='center' variant='h6'>
            Your Not Authorize to view this page you need
            <Button onClick={openLogin}>Login</Button> first or Return{' '}
            <Button onClick={() => Navigations('/')}>Home</Button>
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default Unuthorize
