import React, { useState, useEffect, useContext } from 'react'
import {
  Grid,
  Container,
  IconButton,
  Box,
  Tooltip,
  Pagination,
} from '@mui/material'
import HouseCard from '../Card'
import { motion } from 'framer-motion'
import api from '../../utils/fetching'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import Sidebar from './Sidebar'
import { Search } from '@mui/icons-material'

const Layout = () => {
  const {
    state: { filter, fave },
    dispatch,
  } = useContext(GlobalAuth)
  const [prope, setprope] = useState([])
  const [filterd, setfilterd] = useState([])
  const [porpose, setporpose] = useState('all')
  const [option, setoption] = useState([])
  const [Page, setPage] = useState(1)
  const [num, setnum] = useState(1)
  const [show, setshow] = useState(false)
  const [open, setopen] = useState(false)
  const handelchange = (Page) => {
    dispatch({ type: 'update_filter', payload: { page: Page } })
    setPage(Page)
    window.scroll(0, 0)
  }

  useEffect(() => {
    document.title = 'العقارات'
    const getdata = async () => {
      try {
        let { data } = await api.get(
          `api/home/?ordering=${filter.ordering}&aria=${filter.aria}&building_type=${filter.building_type}&property_type=${filter.property_type}&num_rooms=${filter.num_rooms}&status=${filter.status}&page=${filter.page}&search=${filter.search}&min_price=${filter.min_price}&max_price=${filter.max_price}&bathrooms=${filter.bathrooms}`
        )

        setprope(data?.results)
        setfilterd(data?.results)
        setnum(data?.total_pages)
        setshow(true)
      } catch (error) {
        dispatch({
          type: 'alert',
          payload: {
            open: true,
            severity: 'error',
            message: error.message,
          },
        })
      }
    }
    getdata()
    const getoption = async () => {
      try {
        let { data } = await api.get('api/home/searsh-filter/')
        setoption(data)
      } catch (error) {
        if (!error.response) {
          dispatch({
            type: 'alert',
            payload: {
              open: true,
              severity: 'error',
              message: 'No Server Response',
            },
          })
        }
        dispatch({
          type: 'alert',
          payload: {
            open: true,
            severity: 'error',
            message: error.response.statusText,
          },
        })
      }
    }
    getoption()
  }, [filter, fave])

  return (
    <Container sx={{ marginTop: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Tooltip title='بحث & ترتيب'>
          <IconButton
            sx={{ background: 'rgb(135, 2, 77)', mb: 2 }}
            size='large'
            onClick={() => setopen(true)}
          >
            <Search sx={{ fontSize: '1rem' }} aria-label='Filter' />
          </IconButton>
        </Tooltip>
      </Box>

      <Sidebar
        {...{
          open,
          setopen,
          option,
          prope,
          setfilterd,
          setporpose,
          porpose,
          filterd,
        }}
      />

      <motion.div layout>
        <Grid container spacing={3}>
          {filterd?.map((hou) => (
            <Grid key={hou.id} item xs={12} md={6} lg={4}>
              <HouseCard hou={hou} />
            </Grid>
          ))}
        </Grid>
      </motion.div>
      {show && (
        <div
          style={{
            position: 'static',
            bottom: 0,
            zIndex: 200,
            padding: '10px 80px',
            color: 'white',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <Pagination
              hidePrevButton
              hideNextButton
              onChange={(e) => handelchange(e.target.textContent)}
              count={num}
              color='secondary'
            />
          </div>
        </div>
      )}
    </Container>
  )
}

export default Layout
