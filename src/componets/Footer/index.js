import * as React from 'react'
import { Typography, Box } from '@mui/material'

const Footer = () => {
  return (
    <footer className='footer  footer-desktop'>
      <div className='container-fluid p-0'>
        <div className='copyright-content'>
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
        </div>
      </div>
    </footer>
  )
}

export default Footer
