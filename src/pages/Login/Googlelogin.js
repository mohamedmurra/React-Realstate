import React, { useEffect, useContext } from 'react'
import { Box } from '@mui/material'
import { gapi } from 'gapi-script'
import api from '../../utils/fetching'
import GoogleLogin from '@leecheuk/react-google-login'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import jwt_decode from 'jwt-decode'

const Googlelog = () => {
  const {
    dispatch,
  } = useContext(GlobalAuth)
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_ID,
        scope: 'email',
      })
    }

    gapi.load('client:auth2', start)
  }, [])
  const continueWithGoogle = (res) => {

    SentIt(res.accessToken)
  }
  const SentIt = async (acc) => {
    dispatch({ type: 'start_loading' })
    try {
      const { data } = await api.post(
        'api/social_register/social/google-oauth2/',
        {
          access_token: acc,
        }
      )
      dispatch({ type: 'close_login' })
      const deco = jwt_decode(data.token)
      dispatch({
        type: 'update-user',
        payload: {
          access: data.token,
          refresh: data.refresh,
        },
      })
      const res = await api.get(`viewset/profile/${deco.user_id}/`, {
        headers: { Authorization: `Bearer ${data.token}` },
      })
      dispatch({
        type: 'update-user',
        payload: res.data,
      })
      dispatch({ type: 'end_loading' })
    } catch (error) {
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
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_ID}
        buttonText='Continue With Google'
        cookiePolicy={'single_host_origin'}
        onSuccess={continueWithGoogle}
        onFailure={() =>
          dispatch({
            type: 'alert',
            payload: {
              open: true,
              severity: 'error',
              message: 'Somethings went Rong Try again Later',
            },
          })
        }
      />
    </Box>
  )
}

export default Googlelog
