import React, { useContext } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { GlobalAuth } from '../../componets/UserContext/Provider'

const CustomeAlert = () => {
  const {
    state: { isAlert },
    dispatch,
  } = useContext(GlobalAuth)
  const handlcolse = (event, resson) => {
    if (resson === 'clickaway') return
    dispatch({ type: 'alert', payload: { ...isAlert, open: false } })
  }
  return (
    <Snackbar
      open={isAlert.open}
      autoHideDuration={700}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handlcolse}
    >
      <Alert
        onClose={handlcolse}
        severity={isAlert.severity}
        sx={{ width: '100%' }}
        variant='filled'
        elevation={6}
      >
        {isAlert.message}
      </Alert>
    </Snackbar>
  )
}

export default CustomeAlert
