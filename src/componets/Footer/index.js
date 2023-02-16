import * as React from 'react'
import { Paper, Container, Typography, Box } from '@mui/material'

const Footer = () => {
  return (
    <Paper
      sx={{
        width: '100%',
        position: 'static',
        bottom: 0,
      }}
      component='footer'
      square
      variant='outlined'
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            display: 'flex',
            my: 1,
          }}
        >
          {/* <div>
            <Image priority src='/Logo.svg' width={75} height={30} alt='Logo' />
          </div> */}
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            display: 'flex',
            mb: 2,
          }}
        >
          <Typography variant='caption' color='gold'>
            Copyright ©2022 Murra
          </Typography>
        </Box>
      </Container>
    </Paper>
  )
}

export default Footer
