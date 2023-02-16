import React, { useState, useContext } from 'react'
import { Button } from '@mui/material'
import { Send } from '@mui/icons-material'
import api from '../../utils/fetching'
import { GlobalAuth } from '../../componets/UserContext/Provider'

const ComentMSG = ({ Proper, parent = null }) => {
  const [text, settext] = useState('')
  const {
    state: { user },
    dispatch,
  } = useContext(GlobalAuth)
  const sen = async () => {
    try {
      await api.post('api/home/comment/', {
        user: user.id,
        messaage: text,
        proper: Proper,
        parent_id: parent,
      })
      dispatch({ type: 'comment', payload: text })
      settext('')
    } catch (error) {
      dispatch({ type: 'end_loading' })
      if (text.length > 1) {
        dispatch({
          type: 'alert',
          payload: {
            open: true,
            severity: 'error',
            message: 'Right Somethings first',
          },
        })
      }
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

  const handelSub = (e) => {
    e.preventDefault()
    sen()
    dispatch({ type: 'hide' })
  }
  return (
    <form onSubmit={handelSub}>
      <textarea
        value={text}
        onChange={(e) => settext(e.target.value)}
        style={{
          width: '100%',
          height: 100,
          marginTop: 8,
          border: '1px solid rgb(107,114,12)',
        }}
      />
      <Button
        sx={{ margin: 2, fontSize: '1rem' }}
        type='submit'
        variant='contained'
        endIcon={<Send />}
      >
        Write
      </Button>
    </form>
  )
}
export default ComentMSG
