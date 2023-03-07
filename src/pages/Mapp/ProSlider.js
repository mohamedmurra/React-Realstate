import {
  Box,
  Card,
  ImageListItem,
  ImageListItemBar,
  Container,
} from '@mui/material'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Lazy } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/lazy'
import { useNavigate } from 'react-router-dom'
import './mapsd.css'

const ImgApi = process.env.REACT_APP_IMAGE_URL

function ProSlider({ popup }) {
  console.log(popup)
  const { title, description, price, images, slug } = popup
  const navig = useNavigate()
  return (
    <Card sx={{ maxWidth: 400 }}>
      <ImageListItem sx={{ display: 'block' }}>
        <ImageListItemBar
          sx={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
            zIndex: 2,
          }}
          title={'$' + price}
          position='top'
        />
        <ImageListItemBar
          sx={{ zIndex: 2 }}
          title={title}
          subtitle={description.substr(0, 30) + '...'}
        />
        <Swiper
          modules={[Autoplay, Pagination, Lazy]}
          autoplay={true}
          speed={1000}
          lazy
          pagination={{ clickable: true }}
          style={{
            '--swiper-pagination-color': 'rgba(255,255,255,0,0)',
            '--swiper-pagination-bullet-inactive-color': '#fff',
            '--swiper-pagination-bullet-inactive-color-opacity': 0.5,
          }}
        >
          {images?.map(({ image, id }) => (
            <SwiperSlide key={id}>
              <img
                onClick={() => navig(`/detail/${slug}`)}
                src={`${ImgApi}${image}`}
                className='img-fluid'
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
