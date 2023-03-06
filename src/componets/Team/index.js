import React from 'react'
import Slider from 'react-slick'
import { Container, Typography } from '@mui/material'
import TeamCard from './card'

const TeamMember = ({ Team }) => {
  const settings = {
    dots: true,
    infinite: true,
    adaptiveHeight: true,
    speed: 1500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 1000,
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
      >
        <span style={{ borderBottom: '1px solid #B00020' }}>أدراة الموقع </span>{' '}
      </Typography>
      <Slider {...settings}>
        {Team.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </Slider>
    </Container>
  )
}

export default TeamMember
