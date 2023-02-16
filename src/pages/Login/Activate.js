import { Container } from '@mui/system'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { Navigate, useSearchParams, useNavigate } from 'react-router-dom'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import api from '../../utils/fetching'

function Activate() {
  const {
    dispatch,
    state: { user },
  } = useContext(GlobalAuth)
  const [searchParams] = useSearchParams()
  const uid = searchParams.get('uid') ? searchParams.get('uid') : null
  const token = searchParams.get('token') ? searchParams.get('token') : null
  const Navigations = useNavigate()

  const activate = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ uid, token })
    try {
      api.post('auth/users/activation/', body, config)
      Navigations('/')
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
  useEffect(() => {
    document.title = 'تفعيل الحساب'
  }, [])

  if (!uid & !token) {
    return <Navigate to='/' />
  }

  return (
    <Container>
      {user ? (
        <Navigate to='/' />
      ) : (
        <div className='container'>
          <div
            className='d-flex flex-column justify-content-center align-items-center'
            style={{ marginTop: '200px' }}
          >
            <h1>Verify your Account:</h1>
            <button
              onClick={activate}
              style={{ marginTop: '50px' }}
              type='button'
              className='btn btn-primary'
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </Container>
  )
}

export default Activate
