import { Card, ImageListItem, ImageListItemBar } from '@mui/material'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Lazy } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/lazy'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import './mapsd.css'

const url = process.env.REACT_APP_POINT

function ProSlider(info) {
  const navig = useNavigate()
  return (
    <Card sx={{ maxWidth: 400 }}>
      <ImageListItem sx={{ display: 'block' }}>
        <ImageListItemBar
          sx={{
            background:
              'linear-gradient(to bottom,rgba(0,0,0,0.7)0%,rgba(0,0,0,0.3)70%,rgba(0,0,0,0)100%',
            zIndex: 2,
          }}
          title={`$${info.info.price}`}
          position='top'
        />
        <ImageListItemBar
          sx={{ zIndex: 2 }}
          title={info.info.title}
          subtitle={info.info.description}
        />
        <Swiper
          modules={[Autoplay, Pagination, Lazy]}
          autoplay={true}
          speed={2000}
          lazy
          pagination={{ clickable: true }}
          style={{
            '--swiper-pagination-color': 'rgba(255,255,255,0,0)',
            '--swiper-pagination-bullet-inactive-color': '#fff',
            '--swiper-pagination-bullet-inactive-color-opacity': 0.5,
          }}
        >
          {info.info?.images?.map(({ image, id }) => (
            <SwiperSlide key={id}>
              <Box
                sx={{
                  height: 255,
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                  cursor: 'pointer',
                  objectFit: 'cover',
                }}
                onClick={() => navig(`/detail/${info.info.slug}`)}
                component='img'
                src={`${url}${image}`}
                alt={id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ImageListItem>
    </Card>
  )
}

export default ProSlider
