import React, { useContext } from 'react'
import api from '../utils/fetching'
import { GlobalAuth } from '../componets/UserContext/Provider'

const Refresh = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(GlobalAuth)
  const refresh = async () => {
    const { data } = await api.post('auth/jwt/refresh/', {
      refresh: user.refresh,
    })
    dispatch({ type: 'update-user', payload: { ...user, access: data.access } })
    return data
  }
  return refresh
}

export default Refresh
