import React, { useEffect, useState, useContext } from 'react'
import api from '../../utils/fetching'
import { useParams } from 'react-router-dom'
import { Container, CardMedia, Card, Typography } from '@mui/material'
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Slider from 'react-slick'
import HouseCard from '../../componets/Latest-Property/card'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import { useTranslation } from 'react-i18next'
const ImgApi = process.env.REACT_APP_IMAGE_URL

const AgentDetail = () => {
  const { t } = useTranslation()
  const { dispatch } = useContext(GlobalAuth)
  const [agent, setAgent] = useState({})
  const pram = useParams()

  useEffect(() => {
    document.title = 'تفاصيل العميل'
    const getagent = async () => {
      dispatch({ type: 'start_loading' })
      try {
        let { data } = await api.get(
          `api/TeamMember/agent-detail/${pram.agentId}/`
        )
        setAgent(data)
        dispatch({ type: 'end_loading' })
      } catch (error) {
        dispatch({ type: 'end_loading' })
        dispatch({
          type: 'alert',
          payload: { open: true, severity: 'error', message: error?.message },
        })
      }
    }
    getagent()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    adaptiveHeight: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-5'>
          <Card style={{ marginTop: 20 }} elevation={5}>
            <CardMedia
              component='img'
              height='500'
              width='150'
              image={`${ImgApi}${agent.image}`}
              alt={agent.username}
            />
          </Card>
        </div>
        <div className='col-md-6'>
          <div className='' style={{ marginTop: 20 }}>
            <Typography
              style={{ color: 'orangered' }}
              variant='h4'
              component='h1'
            >
              {agent.first_name} {agent.last_name}
            </Typography>
            <Typography style={{ marginTop: 10 }} variant='h5' component='h2'>
              <AccountCircleIcon /> {agent.username}
            </Typography>
            <p style={{ marginTop: 15 }}>{agent.describe}</p>
            <Typography style={{ marginTop: 10 }} variant='p' component='h6'>
              <MarkEmailUnreadIcon /> :
              <span style={{ marginLeft: 14 }}>{agent.email}</span>
            </Typography>
            <Typography style={{ marginTop: 15 }} variant='p' component='h6'>
              <PhoneForwardedIcon /> :
              <span style={{ marginLeft: 14 }}>{agent.phone_number}</span>
            </Typography>
          </div>
        </div>
      </div>
      <Container style={{ marginTop: 20 }}>
        <Typography style={{ marginBottom: 10 }} variant='h4' component='h2'>
          {t('agent-pro')} ({agent?.proper?.length})
        </Typography>
        <Slider {...settings}>
          {agent?.proper?.map((hou) => (
            <HouseCard key={hou.id} hou={hou} />
          ))}
        </Slider>
      </Container>
    </div>
  )
}

export default AgentDetail
