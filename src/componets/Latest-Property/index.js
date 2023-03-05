import React from 'react'
import Slider from 'react-slick'
import { Typography, Container } from '@mui/material'
import HouseCard from './card'
import { Link } from 'react-router-dom'
import { FaAngleDoubleRight } from 'react-icons/fa'

const LatestProperty = ({ pro }) => {
  const settings = {
    dots: true,
    infinite: true,
    adaptiveHeight: true,
    speed: 2000,
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
        breakpoint: 673,
        settings: {
          slidesToShow: 2,
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
    <>
      <div style={{ marginTop: 50 }}>
        <Container>
          <Typography
            style={{ color: 'inhert', marginTop: 30, marginBottom: 25 }}
            variant='h4'
            component='h5'
            textAlign='center'
          >
            <span style={{ borderBottom: '1px solid #B00020' }}>
              {' '}
              أخر عقارات تم أضافتها
            </span>{' '}
          </Typography>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/main'>
            <Typography
              variant='p'
              style={{ color: 'inhert', marginTop: 20 }}
              component='h5'
              textAlign='right'
            >
              {' '}
              كل العقارات <FaAngleDoubleRight style={{ fontSize: '.5rem' }} />
            </Typography>
          </Link>

          <Slider {...settings}>
            {pro.map((hou) => (
              <HouseCard key={hou.id} hou={hou} />
            ))}
          </Slider>
        </Container>
      </div>
    </>
  )
}

export default LatestProperty
