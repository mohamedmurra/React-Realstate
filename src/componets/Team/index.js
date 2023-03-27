import React from 'react'
import Slider from 'react-slick'
import { Container, Typography } from '@mui/material'
import TeamCard from './card'
import { useTranslation } from 'react-i18next'

const TeamMember = ({ Team }) => {
  const { t } = useTranslation()
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    adaptiveHeight: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
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
    <Container>
      <Typography
        style={{ color: 'inhert', marginTop: 30, marginBottom: 25 }}
        variant='h4'
        component='h5'
        textAlign='center'
        sx={{ fontSize: { md: '2rem', xs: '1.5rem' } }}
      >
        <span style={{ borderBottom: '1px solid #B00020' }}>
          {' '}
          {t('web-man')}{' '}
        </span>{' '}
      </Typography>
      <Slider {...settings}>
        {Team?.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </Slider>
    </Container>
  )
}

export default TeamMember
