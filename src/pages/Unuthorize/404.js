import { Typography, Button, Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {

  const Navigations = useNavigate()
  return (
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
        Error 404 Page Not Found
      </Typography>
      <Typography sx={{ mt: 5 }} textAlign='center' variant='h6'>
        We looked everywhere for this page . Are you sure the website URL is
        correct ? Go
        <Button onClick={() => Navigations('/')}>Homepage</Button>
      </Typography>
    </Box>
  )
}

export default Error404
