import React, { useState, useEffect, useContext } from 'react'
import { Grid, Container, Pagination } from '@mui/material'
import TeamCard from '../../componets/TeamCard'
import api from '../../utils/fetching'
import { GlobalAuth } from '../../componets/UserContext/Provider'

const Agents = () => {
  const [prope, setprope] = useState([])
  const [page, setpage] = useState(1)
  const [number, setnumber] = useState(1)
  const { dispatch } = useContext(GlobalAuth)
  const getdata = async () => {
    dispatch({ type: 'start_loading' })
    try {
      let { data } = await api.get(`api/TeamMember/?page=${page}`)
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
  }, [page])

  const handelchange = (Page) => {
    setpage(Page)
    window.scroll(0, 0)
  }

  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid container spacing={5}>
        {prope.map((hou) => (
          <Grid key={hou.id} item xs={12} md={6} lg={4}>
            <TeamCard member={hou} />
          </Grid>
        ))}
      </Grid>
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
            count={number}
            color='secondary'
          />
        </div>
      </div>
    </Container>
  )
}

export default Agents
