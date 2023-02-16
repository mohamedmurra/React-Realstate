import React, { useContext, useEffect } from 'react'
import PrivateApi from '../utils/private'
import Refresh from './refresh'
import { GlobalAuth } from '../componets/UserContext/Provider'

const usePrivateRoute = () => {
  const refresh = Refresh()
  const {
    state: { user },
    dispatch,
  } = useContext(GlobalAuth)

  useEffect(() => {
    const requestIntercept = PrivateApi.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${user?.access}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = PrivateApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previous = error?.config
        if (error?.response?.status === 401 && !previous?.sent) {
          previous.sent = true
          const newAcc = await refresh()
          previous.headers['Authorization'] = `Bearer ${newAcc}`
          return PrivateApi(previous)
        }
        return Promise.reject(error)
      }
    )
    return () => {
      PrivateApi.interceptors.response.eject(responseIntercept)
      PrivateApi.interceptors.request.eject(requestIntercept)
    }
  }, [user, refresh])

  return PrivateApi
}

export default usePrivateRoute
