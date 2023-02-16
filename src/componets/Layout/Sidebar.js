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
          ترتيب & بحث{' '}
          <span style={{ ml: 7, fontSize: '.9rem', color: 'red' }}>
            تم أيجاد {filterd?.length}
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
          helperText='... أبحث هون'
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
          نوع العرض
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
            الكل
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
              {p.name === 'Rent' ? 'للأيجار' : 'للبيع'}
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            mt: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            display: 'flex',
          }}
        >
          {' '}
          <FormControl>
            <Typography component='p' variant='subtitle2'>
              السعر الأدني
            </Typography>
            <Select
              label='السعر الأدني'
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
              السعر الأعلي
            </Typography>
            <Select
              label='السعر الأعلي'
              name='max_price'
              variant='standard'
              value={filter.max_price}
              onChange={handelch}
            >
              <MenuItem value=''>غير محدود</MenuItem>
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
            mt: 4,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            display: 'flex',
          }}
        >
          <FormControl>
            <Typography component='p' variant='subtitle2'>
              عدد الحمامات
            </Typography>
            <Select
              label=' عدد الحمامات'
              name='bathrooms'
              variant='standard'
              value={filter.bathrooms}
              onChange={handelch}
              fullWidth
            >
              <MenuItem value=''>الكل</MenuItem>
              {bath?.map((b) => (
                <MenuItem key={b.name} value={b.value}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Typography component='p' variant='subtitle2'>
              عدد الغرف
            </Typography>
            <Select
              label='عدد الغرف'
              name='num_rooms'
              variant='standard'
              value={filter.num_rooms}
              onChange={handelch}
              fullWidth
            >
              <MenuItem value=''>الكل</MenuItem>
              {rooms?.map((b) => (
                <MenuItem key={b.name} value={b.value}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ flexDirection: 'row', m: 0.5 }}></Box>
        <Box sx={{ mt: 2 }}>
          <Typography component='p' variant='subtitle2'>
            المنطقة
          </Typography>
          <Select
            label='Type'
            name='aria'
            size='small'
            variant='filled'
            value={filter.aria}
            onChange={handelch}
            sx={{ width: '100%', mt: 0.4 }}
          >
            <MenuItem value=''>الكل</MenuItem>
            {option?.lucation?.map((b) => (
              <MenuItem key={b.slug} value={b.id}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography component='p' variant='subtitle2'>
            نوع المبني
          </Typography>
          <Select
            sx={{ width: '100%', mt: 0.4 }}
            label='Type'
            name='building_type'
            size='small'
            variant='filled'
            value={filter.building_type}
            onChange={handelch}
          >
            <MenuItem value=''>الكل</MenuItem>
            {option?.buildings?.map((b) => (
              <MenuItem key={b.slug} value={b.id}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button
          sx={{
            mt: 3,
            padding: '0.5em 1rem',
            border: 'none',
            borderRadius: '1rem',
            cursor: 'pointer',
            backgroundColor: 'rgb(185, 5, 59)',
            color: 'inherit',
          }}
          onClick={() => {
            dispatch({ type: 'reset_filter' })
          }}
        >
          أعادة تعين
        </Button>
      </Box>
    </Drawer>
  )
}

export default Sidebar
