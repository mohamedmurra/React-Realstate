import React, { useEffect, useState, useContext } from 'react'
import LatestProperty from '../../componets/Latest-Property'
import Hero from '../../componets/Hero'
import OurServies from '../../componets/Servies'
import LatestBlog from '../../componets/LatestBlog'
import Testimonial from '../../componets/Testimonials'
import TeamMember from '../../componets/Team'
import api from '../../utils/fetching'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import { Box, Container } from '@mui/material'

const HomePage = () => {
  const [info, setInfo] = useState([])
  const { dispatch } = useContext(GlobalAuth)

  useEffect(() => {
    document.title = 'الصفحة الرئيسية'
    const getit = async () => {
      try {
        dispatch({ type: 'start_loading' })
        let { data } = await api.get(`api/homepage/`)
        setInfo(data)
        dispatch({ type: 'end_loading' })
      } catch (error) {
        dispatch({ type: 'end_loading' })
        dispatch({
          type: 'alert',
          payload: { open: true, severity: 'error', message: error?.message },
        })
      }
    }
    getit()
  }, [])

  return (
    <>
      <Hero />
      <Container>
        <OurServies />
        <LatestProperty pro={info?.latest_property} />
        <LatestBlog Lblog={info?.latest_blog} />
        <TeamMember Team={info?.Team} />
        <Testimonial len={info?.tess} Testo={info?.Testomany} />
      </Container>
    </>
  )
}

export default HomePage
