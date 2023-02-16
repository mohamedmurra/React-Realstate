import React, { useEffect, useState, useContext } from 'react'
import LatestProperty from '../../componets/Latest-Property'
import Hero from '../../componets/Hero'
import OurServies from '../../componets/Servies'
import LatestBlog from '../../componets/LatestBlog'
import Testimonial from '../../componets/Testimonials'
import TeamMember from '../../componets/Team'
import api from '../../utils/fetching'
import { GlobalAuth } from '../../componets/UserContext/Provider'

const HomePage = () => {
  const [info, setInfo] = useState([])
  const { dispatch } = useContext(GlobalAuth)

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

  useEffect(() => {
    document.title = 'الصفحة الرئيسية'
    getit()
  }, [])
  const pro = info?.latest_property ? info.latest_property : []
  const Lblog = info?.latest_blog ? info.latest_blog : []
  const Testo = info?.Testomany ? info.Testomany : []
  const Team = info?.Team ? info.Team : []
  const tess = info?.tess ? info.tess : []

  return (
    <>
      <Hero />
      <OurServies />
      <LatestProperty pro={pro} />
      <LatestBlog Lblog={Lblog} />
      <TeamMember Team={Team} />
      <Testimonial len={tess} Testo={Testo} />
    </>
  )
}

export default HomePage
