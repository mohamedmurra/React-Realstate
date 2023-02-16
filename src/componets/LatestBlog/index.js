import React from 'react'
import Slider from 'react-slick'
import { Typography, Container } from '@mui/material'
import BlogCard from './card'
import { Link } from 'react-router-dom'
import { FaAngleDoubleRight } from 'react-icons/fa'

const LatestBlog = ({ Lblog }) => {
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
    <div className='' style={{ marginTop: 50 }}>
      <Container>
        <Typography
          variant='h3'
          style={{ color: 'inhert', marginTop: 30, marginBottom: 25 }}
          component='h1'
          textAlign='center'
        >
          <span style={{ borderBottom: '1px solid blue' }}>
            {' '}
            أخر منشورات تم أضافتها
          </span>{' '}
        </Typography>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/blog'>
          <Typography
            variant='h6'
            style={{ color: 'inhert', marginTop: 20 }}
            component='h5'
            textAlign='right'
          >
            {' '}
            كل المنشورات <FaAngleDoubleRight style={{ fontSize: '.5rem' }} />
          </Typography>
        </Link>

        <Slider {...settings}>
          {Lblog.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </Slider>
      </Container>
    </div>
  )
}

export default LatestBlog
