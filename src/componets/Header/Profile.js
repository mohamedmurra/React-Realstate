import React from 'react'
import { Box,Stack,Link,Button } from '@mui/material'
import { BsGlobe } from 'react-icons/bs'


const Profile = () => {
  return (
    <Box >
      <Link href='/'>Profile</Link>
      <Stack>
       <Button><BsGlobe size={24} /></Button>
      </Stack>
    </Box>
  )
}

export default Profile
