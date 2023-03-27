import React from 'react'
import { Avatar, Typography, Rating } from '@mui/material'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const ImgApi = process.env.REACT_APP_IMAGE_URL
const Testimonial = ({ Testo, len }) => {
  const { t } = useTranslation()
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    adaptiveHeight: true,
    speed: 1000,
  }
  return (
    <div className='teste' style={{ margin: 50 }}>
      <Typography
        style={{ color: 'inhert', marginTop: 40, marginBottom: 25 }}
        variant='h4'
        component='h5'
        textAlign='center'
        sx={{ fontSize: { md: '2rem', xs: '1.5rem' } }}
      >
        <span style={{ borderBottom: '1px solid #B00020' }}>
          {' '}
          {t('test')} ({len?.length})
        </span>
      </Typography>
      <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/about-us'>
        <Typography
          variant='p'
          style={{ color: 'inhert', marginTop: 20 }}
          component='h5'
          textAlign='right'
          sx={{ fontSize: { md: '1.8rem', xs: '.8rem' } }}
        >
          {' '}
          {t('test-a')} <FaAngleDoubleRight style={{ fontSize: '.5rem' }} />
        </Typography>
      </Link>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '50%' }}>
          <Slider {...settings}>
            {Testo?.map((test, url) => (
              <Card key={test.id} test={test} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}
const Card = ({ test }) => {
  const { review, image, message, name } = test
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        color: 'gray',
      }}
    >
      <div style={{ marginTop: 30 }}>
        <Avatar src={`${ImgApi}${image}`} style={{ width: 120, height: 120 }} />
        <Rating readOnly style={{ marginTop: 10 }} value={review} />
      </div>
      <p style={{ marginTop: 20 }}>{message}</p>
      <p style={{ fontStyle: 'italic' }}>
        By{' '}
        <span
          style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            color: 'rgb(138, 224, 9)',
          }}
        >
          {name}
        </span>
      </p>
    </div>
  )
}

export default Testimonial
