import { Stack, FormControl, Checkbox, FormControlLabel } from '@mui/material'
import React, { useContext } from 'react'
import { GlobalAuth } from '../UserContext/Provider'
import CustomeText from '../CustomeText'
import Maps from './Maps'
import { useTranslation } from 'react-i18next'

const Cover = () => {
  const { t } = useTranslation()
  const {
    dispatch,
    state: { detail, editing },
  } = useContext(GlobalAuth)
  const handelIMg = (e) => {
    dispatch({ type: 'update_detail', payload: { cover: e.target.files[0] } })
  }

  const handeledit = (e) => {
    dispatch({ type: 'updated_room', payload: { cover: e.target.files[0] } })
    dispatch({ type: 'update_detail', payload: { cover: e.target.files[0] } })
  }
  const handeled = (e) => {
    dispatch({
      type: 'update_detail',
      payload: { status: e.target.checked },
    })
    dispatch({
      type: 'updated_room',
      payload: { status: e.target.checked },
    })
  }

  return (
    <Stack
      sx={{
        alignItems: 'center',
        '& .MuiTextField-root': { width: '100%', maxWidth: 500, m: 1 },
      }}
    >
      <FormControl>
        <label htmlFor='image'>{t('steps-img')}</label>
        <input
          accept='image/*'
          onChange={editing ? handeledit : handelIMg}
          type='file'
          name='image'
          id='image'
        />
      </FormControl>
      <CustomeText
        minLen={5}
        minProp={{ name: 'slug', label: 'Slug', value: detail.slug }}
      />
      <FormControl>
        <FormControlLabel
          label={t('steps-status')}
          control={
            <Checkbox
              name='status'
              color='primary'
              checked={detail.status}
              onChange={(e) =>
                editing
                  ? handeled(e)
                  : dispatch({
                      type: 'update_detail',
                      payload: { status: e.target.checked },
                    })
              }
            />
          }
        />
      </FormControl>
      <Maps />
    </Stack>
  )
}

export default Cover
