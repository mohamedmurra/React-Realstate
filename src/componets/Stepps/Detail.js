import React, { useContext } from 'react'
import {
  BedOutlined,
  BathtubOutlined,
  SquareFoot,
  GpsFixed,
} from '@mui/icons-material'
import {
  Stack,
  FormControl,
  InputAdornment,
  RadioGroup,
  TextField,
} from '@mui/material'
import { GlobalAuth } from '../UserContext/Provider'
import CustomeText from '../CustomeText'
import { useTranslation } from 'react-i18next'

const Detail = () => {
  const { t } = useTranslation()
  const {
    state: { detail, editing },
    dispatch,
  } = useContext(GlobalAuth)

  const handelPrice = (e) => {
    dispatch({
      type: 'update_detail',
      payload: { [e.target.name]: e.target.value },
    })
  }

  const handeledit = (e) => {
    dispatch({
      type: 'updated_room',
      payload: { [e.target.name]: e.target.value },
    })
    dispatch({
      type: 'update_detail',
      payload: { [e.target.name]: e.target.value },
    })
  }

  return (
    <Stack
      sx={{
        alignItems: 'center',
        '& .MuiTextField-root': { width: '100%', maxWidth: 500, m: 2 },
      }}
    >
      <FormControl>
        <RadioGroup row>
          <TextField
            sx={{ width: '7ch !important' }}
            variant='standard'
            name='num_rooms'
            label={t('side-room')}
            required
            value={detail.num_rooms}
            onChange={editing ? handeledit : handelPrice}
            inputProps={{ type: 'number', min: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <BedOutlined sx={{ fontSize: '1rem' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ width: '9ch !important' }}
            variant='standard'
            name='bathrooms'
            label={t('side-bath')}
            required
            value={detail.bathrooms}
            onChange={editing ? handeledit : handelPrice}
            inputProps={{ type: 'number', min: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <BathtubOutlined sx={{ fontSize: '1rem' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ width: '14ch !important' }}
            variant='standard'
            name='price'
            label={t('pro-price')}
            required
            value={detail.price}
            onChange={editing ? handeledit : handelPrice}
            inputProps={{ type: 'number', min: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>$</InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ width: '10ch !important' }}
            variant='standard'
            name='space'
            label={t('pro-space')}
            required
            value={detail.space}
            onChange={editing ? handeledit : handelPrice}
            inputProps={{ type: 'number', min: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <SquareFoot sx={{ fontSize: '1rem' }} />
                </InputAdornment>
              ),
            }}
          />
        </RadioGroup>
      </FormControl>
      <CustomeText
        minLen={5}
        minProp={{
          name: 'title',
          label: t('steps-title'),
          value: detail.title,
        }}
      />
      <CustomeText
        minLen={10}
        minProp={{
          name: 'description',
          label: t('pro-desc'),
          value: detail.description,
        }}
        option={{ rows: 5, multiline: true }}
      />
    </Stack>
  )
}

export default Detail
