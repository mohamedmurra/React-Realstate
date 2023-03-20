import { ChevronLeft } from '@mui/icons-material'
import {
  Button,
  Drawer,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
  FormControl,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaSearch } from 'react-icons/fa'
import { GlobalAuth } from '../UserContext/Provider'
import './sty.css'

const SideConfig = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

function Sidebar({
  open,
  setopen,
  option,
  prope,
  setfilterd,
  setporpose,
  porpose,
  filterd,
}) {
  const handelch = (e) => {
    dispatch({
      type: 'update_filter',
      payload: { page: 1 },
    })
    dispatch({
      type: 'update_filter',
      payload: { [e.target.name]: e.target.value },
    })
  }
  const { t } = useTranslation()
  const {
    state: { filter },
    dispatch,
  } = useContext(GlobalAuth)

  useEffect(() => {
    if (porpose === 'all') {
      setfilterd(prope)
      return
    }
    const feil = prope?.filter((p) => p.property_type === porpose)
    setfilterd(feil)
  }, [porpose])

  const v_min = [
    { name: '$2,500', value: 2500 },
    { name: '$5,000', value: 5000 },
    { name: '$7,000', value: 7000 },
    { name: '$10,000', value: 10000 },
  ]
  const v_max = [
    { name: '$50,000', value: 50000 },
    { name: '$100,000', value: 100000 },
    { name: '$150,000', value: 150000 },
    { name: '$300,000', value: 300000 },
  ]
  const bath = [
    { name: 1, value: 1 },
    { name: 2, value: 2 },
    { name: 3, value: 3 },
    { name: 4, value: 4 },
    { name: 5, value: 5 },
  ]
  const rooms = [
    { name: 1, value: 1 },
    { name: 2, value: 2 },
    { name: 3, value: 3 },
    { name: 4, value: 4 },
    { name: 5, value: 5 },
  ]

  return (
    <Drawer variant='persistent' hideBackdrop={true} open={open}>
      <SideConfig>
        <Typography>
          {t('side_head')}

          <span style={{ my: 7, fontSize: '.9rem', color: 'red' }}>
            {t('side_len')} {filterd?.length}
          </span>
        </Typography>
        <IconButton onClick={() => setopen(false)}>
          <ChevronLeft fontSize='large' />
        </IconButton>
      </SideConfig>
      <Box sx={{ width: { lg: 250, md: 250 }, p: 2 }}>
        <TextField
          sx={{ width: '95%' }}
          variant='standard'
          name='search'
          size='small'
          helperText={t('side-s')}
          value={filter.search}
          onChange={handelch}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <FaSearch sx={{ fontSize: '1rem' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ width: { lg: 250, md: 250 }, p: 2 }}>
        <Typography component='p' variant='subtitle2'>
          {t('side-pro-ty')}
        </Typography>
        <Box sx={{ flexDirection: 'row', mt: 0.4 }}>
          <Button
            className={filter.property_type === '' ? 'active' : ''}
            onClick={() => {
              dispatch({
                type: 'update_filter',
                payload: { page: 1 },
              })
              dispatch({
                type: 'update_filter',
                payload: { property_type: '' },
              })
              setporpose('')
            }}
          >
            {t('side-all')}
          </Button>
          {option?.purp?.map((p) => (
            <Button
              className={filter.property_type === p.id ? 'active' : ''}
              key={p.id}
              onClick={() => {
                dispatch({
                  type: 'update_filter',
                  payload: { page: 1 },
                })
                dispatch({
                  type: 'update_filter',
                  payload: { property_type: p.id },
                })
                setporpose(p.name)
              }}
            >
              {p.name === 'Rent' ? t('side-rent') : t('side-sell')}
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            mt: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            display: 'flex',
          }}
        >
          {' '}
          <FormControl>
            <Typography component='p' variant='subtitle2'>
              {t('side-min-p')}
            </Typography>
            <Select
              label={t('side-min-p')}
              name='min_price'
              variant='standard'
              value={filter.min_price}
              onChange={handelch}
              fullWidth
            >
              <MenuItem value=''>0</MenuItem>
              {v_min?.map((b) => (
                <MenuItem key={b.name} value={b.value}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Typography component='p' variant='subtitle2'>
              {t('side-max-p')}
            </Typography>
            <Select
              label={t('side-max-p')}
              name='max_price'
              variant='standard'
              value={filter.max_price}
              onChange={handelch}
            >
              <MenuItem value=''> {t('side-unli')}</MenuItem>
              {v_max?.map((b) => (
                <MenuItem key={b.name} value={b.value}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            mt: 2,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            display: 'flex',
          }}
        >
          <FormControl>
            <Typography component='p' variant='subtitle2'>
              {t('side-bath')}
            </Typography>
            <Select
              label={t('side-bath')}
              name='bathrooms'
              variant='standard'
              value={filter.bathrooms}
              onChange={handelch}
              fullWidth
            >
              <MenuItem value=''>{t('side-all')}</MenuItem>
              {bath?.map((b) => (
                <MenuItem key={b.name} value={b.value}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Typography component='p' variant='subtitle2'>
              {t('side-room')}
            </Typography>
            <Select
              label={t('side-room')}
              name='num_rooms'
              variant='standard'
              value={filter.num_rooms}
              onChange={handelch}
              fullWidth
            >
              <MenuItem value=''>{t('side-all')}</MenuItem>
              {rooms?.map((b) => (
                <MenuItem key={b.name} value={b.value}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ flexDirection: 'row', m: 0.5 }}></Box>
        <Box sx={{ mt: 1 }}>
          <Typography component='p' variant='subtitle2'>
            {t('side-ar')}
          </Typography>
          <Select
            label={t('side-ar')}
            name='aria'
            size='small'
            variant='filled'
            value={filter.aria}
            onChange={handelch}
            sx={{ width: '100%', mt: 0.4 }}
          >
            <MenuItem value=''>{t('side-all')}</MenuItem>
            {option?.lucation?.map((b) => (
              <MenuItem key={b.slug} value={b.id}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography component='p' variant='subtitle2'>
            {t('side-build')}
          </Typography>
          <Select
            sx={{ width: '100%', mt: 0.4 }}
            label={t('side-build')}
            name='building_type'
            size='small'
            variant='filled'
            value={filter.building_type}
            onChange={handelch}
          >
            <MenuItem value=''>{t('side-all')}</MenuItem>
            {option?.buildings?.map((b) => (
              <MenuItem key={b.slug} value={b.id}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button
          sx={{
            mt: 1.5,
            padding: '0.5em 1rem',
            border: 'none',
            borderRadius: '1rem',
            cursor: 'pointer',
            backgroundColor: 'rgb(135, 2, 77)',
            color: 'inherit',
          }}
          onClick={() => {
            dispatch({ type: 'reset_filter' })
          }}
        >
          {t('side-set')}
        </Button>
      </Box>
    </Drawer>
  )
}

export default Sidebar
