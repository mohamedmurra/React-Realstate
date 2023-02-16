import axios from 'axios'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import jwt_decode from 'jwt-decode'
import api from '../../utils/fetching'

function GoogleLAy() {
  const [searchParams] = useSearchParams()
  const { dispatch } = useContext(GlobalAuth)
  const navigate = useNavigate()

  const code = searchParams.get('code') ? searchParams.get('code') : null

  const googleAuthenticate = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_END_POINT}auth/o/google-oauth2/?code=${code}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )

      const deco = jwt_decode(res.data.access)

      dispatch({
        type: 'update-user',
        payload: {
          access: res.data.access,
          refresh: res.data.refresh,
        },
      })
      const ress = await api.get(`viewset/profile/${deco.user_id}/`, {
        headers: { Authorization: `Bearer ${res.data.access}` },
      })
      dispatch({
        type: 'update-user',
        payload: ress.data,
      })
      navigate('/')
    } catch (err) {
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'error',
          message: err?.response?.statusText,
        },
      })
    }
  }
  useEffect(() => {
    if (code) {
      googleAuthenticate()
    }
  }, [])
  return <div>Authenticate with google please wait ....</div>
}

export default GoogleLAy
