import React, { useEffect, useState } from 'react'
import usePrivateRoute from '../../hooks.js/usePrivateRoute'
import HouseCard from '../../componets/Card'
import Paginate from '../../componets/Pagintion'
import { Container, Grid } from '@mui/material'
import { useContext } from 'react'
import { GlobalAuth } from '../../componets/UserContext/Provider'

function Faver() {
  const {
    state: { fave },
    dispatch,
  } = useContext(GlobalAuth)
  const [dat, setdat] = useState([])
  const [Page, setPage] = useState(1)
  const [num, setnum] = useState(1)
  const Private = usePrivateRoute()
  const getPe = async () => {
    dispatch({ type: 'start_loading' })
    try {
      let { data } = await Private.get('api/home/fav/')
      setdat(data.results)
      dispatch({ type: 'end_loading' })
    } catch (error) {
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
    document.title = 'المفضلات'
    getPe()
  }, [fave, Page])
  return (
    <Container sx={{ marginTop: 5, }}>
      <Grid container spacing={3}>
        {dat?.map((hou) => (
          <Grid key={hou.id} item xs={12} md={6} lg={4}>
            <HouseCard hou={hou} />
          </Grid>
        ))}
      </Grid>
      <Paginate Page={num} setPage={setPage} />
    </Container>
  )
}

export default Faver
