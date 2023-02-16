import React, { useState, useEffect, useContext } from 'react'
import { Grid, Container, Paper } from '@mui/material'
import TeamCard from '../../componets/TeamCard'
import api from '../../utils/fetching'
import { motion } from 'framer-motion'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import Paginate from '../../componets/Pagintion'

const Agents = () => {
  const [prope, setprope] = useState([])
  const [page, setpage] = useState(1)
  const [number, setnumber] = useState(1)
  const { dispatch } = useContext(GlobalAuth)
  const getdata = async () => {
    try {
      let { data } = await api.get(`api/TeamMember/?page=${page}`)
      dispatch({ type: 'start_loading' })
      setprope(data?.results)
      setnumber(data?.total_pages)
      dispatch({ type: 'end_loading' })
    } catch (error) {
      if (!error?.response) {
        dispatch({ type: 'end_loading' })
        dispatch({
          type: 'alert',
          payload: {
            open: true,
            severity: 'error',
            message: 'No Server Response',
          },
        })
      }
      dispatch({ type: 'end_loading' })
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
    document.title = ' العملاء'
    getdata()
  }, [])

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Container sx={{ marginTop: 5, minHeight: '79vh' }}>
        <Grid container spacing={5}>
          {prope.map((hou) => (
            <Grid key={hou.id} item xs={12} md={6} lg={4}>
              <TeamCard member={hou} />
            </Grid>
          ))}
        </Grid>
        <Paginate Page={number} setPage={setpage} />
      </Container>
    </motion.div>
  )
}

export default Agents
