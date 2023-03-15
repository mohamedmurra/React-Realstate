import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import {
  CheckBox,
  BedOutlined,
  BathtubOutlined,
  HomeOutlined,
  NotAccessible,
  PriceCheck,
  CheckCircle,
  RecentActorsOutlined,
} from '@mui/icons-material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import { Button, Container, Paper, Typography } from '@mui/material'
import { BsGridFill } from 'react-icons/bs'
import api from '../../utils/fetching'
import TeamCard from '../../componets/TeamCard'
import NumberFormat from 'react-number-format'
import HouseCard from './reCard'
import Comment from './Comment'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import ComentMSG from './Cform'
import moment from 'moment'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import 'swiper/css/lazy'
import 'swiper/css/zoom'
import './swiper.css'
import { FaHeart } from 'react-icons/fa'
import usePrivateRoute from '../../hooks.js/usePrivateRoute'
const url = process.env.REACT_APP_POINT
const ImgApi = process.env.REACT_APP_IMAGE_URL

const PropertyDetail = () => {
  const PrivateRoute = usePrivateRoute()
  const {
    state: { user, s_comment, fave },
    dispatch,
  } = useContext(GlobalAuth)
  const [house, setHouse] = useState('')
  const post = useParams()

  const getFave = async () => {
    try {
      await PrivateRoute.post(
        `${url}api/home/fav/${
          house?.favourties?.includes(user.id) ? 'remove' : 'add'
        }/`,
        {
          slug: house.slug,
        }
      )
      dispatch({
        type: 'update_fave',
        payload: fave === 'reset' ? '' : 'reset',
      })
    } catch (error) {
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'error',
          message: 'Property already on Favourites',
        },
      })
    }
  }

  useEffect(() => {
    const getit = async () => {
      try {
        dispatch({ type: 'start_loading' })
        let { data } = await api.get(`api/home/property/${post.propertyID}/`)
        setHouse(data)

        dispatch({ type: 'end_loading' })
      } catch (error) {
        dispatch({ type: 'end_loading' })
        dispatch({
          type: 'alert',
          payload: {
            open: true,
            severity: 'error',
            message: error?.response?.statusText,
          },
        })
      }
    }
    document.title = 'تفاصيل العقار'
    getit()
  }, [s_comment, fave])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
  }

  const parnetComent = house?.comment?.filter((i) => i.parent_id === null)
  const getreplay = (com_id) => {
    return house?.comment
      ?.filter((i) => i.parent_id === com_id)
      .sort(
        (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
      )
  }

  return (
    <>
      <Container sx={{ pt: 5, mb: 5 }}>
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
          centeredSlides
          slidesPerView={2}
          grabCursor
          navigation
          autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          lazy
          zoom
          effect='coverflow'
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {house?.images?.map(({ image, id }) => (
            <SwiperSlide key={id}>
              <div className='swiper-zoom-container'>
                <img src={`${ImgApi}${image}`} alt={id} />
              </div>
            </SwiperSlide>
          ))}
          {user && (
            <Button
              onClick={() => getFave()}
              sx={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                zIndex: 2,
              }}
            >
              <FaHeart
                size={25}
                color={house?.favourties?.includes(user.id) ? 'red' : 'grey'}
              />
            </Button>
          )}
        </Swiper>
      </Container>

      <section id='aa-properties'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='row mb-3'>
                <div className='col-4 themed-grid-col'>
                  <div className='status'>
                    {house.status ? 'متأح' : 'غير متأح '}
                  </div>
                </div>
                <div className='col-4 themed-grid-col'>
                  <div className='purp'>
                    {house.property_type === 'Rent' ? 'للأيجار' : 'للبيع'}
                  </div>
                </div>
                <div className='col-4 themed-grid-col'>
                  <div className='blog-post-meta'>
                    <CalendarMonthIcon
                      style={{ color: 'orangered', fontSize: '1.2rem' }}
                    />
                    {moment(house.created).format('YYYY-MM-DD HH:mm')}
                  </div>
                </div>
              </div>
              <div className='price-detail'>
                <Typography textAlign='left' variant='h4' component='h2'>
                  <span style={{ color: 'orangered' }}>{house.title}</span>{' '}
                  <MonetizationOnIcon
                    style={{
                      color: 'green',
                      fontSize: '1.2rem',
                      marginLeft: 20,
                      marginBottom: -3,
                    }}
                  />
                  <NumberFormat
                    value={house.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'SD '}
                    renderText={(value, props) => (
                      <span style={{ fontSize: '1rem' }} {...props}>
                        {value}
                      </span>
                    )}
                  />
                  {house.property_type === 'Rent' ? (
                    <span style={{ fontSize: '1rem', marginLeft: 5 }}>
                      {house.rent_type}
                    </span>
                  ) : (
                    ''
                  )}
                </Typography>
                <Typography
                  textAlign='right'
                  variant='h5'
                  component='h3'
                ></Typography>
                <div style={{ marginTop: 5 }}>
                  <Typography variant='h6' component='h1'>
                    <LocationOnIcon
                      style={{ color: 'orangered', fontSize: '1.2rem' }}
                    />{' '}
                    {house.aria}
                  </Typography>
                </div>
              </div>
              <div style={{ marginTop: 30, gap: 1 }} className='describe'>
                <Typography
                  style={{
                    marginBottom: 30,
                    borderLeft: '2px solid orangered',
                  }}
                  textAlign='left'
                  variant='h4'
                  component='h2'
                >
                  <span style={{ marginLeft: 4 }}>الوصف</span>
                </Typography>
                <p style={{ fontSize: '1rem' }}>{house.description}</p>
              </div>

              <div className='feather'>
                <div style={{ marginTop: 30 }} className='row mb-3'>
                  <div className='mds2 col-md-8 '>
                    <Typography
                      style={{
                        marginBottom: 30,
                        borderLeft: '2px solid orangered',
                      }}
                      textAlign='left'
                      variant='h4'
                      component='h2'
                    >
                      <span style={{ marginLeft: 4 }}>حول العقار</span>
                    </Typography>
                    <div className=''>
                      <Typography
                        style={{ marginTop: 15 }}
                        variant='p'
                        component='h6'
                      >
                        <BedOutlined
                          style={{ color: 'orangered', marginRight: 4 }}
                        />
                        الغرف :{' '}
                        <span style={{ marginTop: 15, marginLeft: 3 }}>
                          {house.num_rooms}
                        </span>
                      </Typography>
                      <Typography
                        style={{ marginTop: 15 }}
                        variant='p'
                        component='h6'
                      >
                        <BathtubOutlined
                          style={{ color: 'orangered', marginRight: 4 }}
                        />
                        الحمامات :{' '}
                        <span style={{ marginTop: 15, marginLeft: 3 }}>
                          {house.bathrooms}
                        </span>
                      </Typography>
                      <Typography
                        style={{ marginTop: 15 }}
                        variant='p'
                        component='h6'
                      >
                        <RecentActorsOutlined
                          style={{ color: 'orangered', marginRight: 4 }}
                        />
                        نوع العرض :{' '}
                        <span style={{ marginTop: 15, marginLeft: 3 }}>
                          {house.property_type === 'Rent' ? 'للأيجار' : 'للبيع'}
                        </span>
                      </Typography>
                      <Typography
                        style={{ marginTop: 15 }}
                        variant='p'
                        component='h6'
                      >
                        <BsGridFill
                          style={{ color: 'orangered', marginRight: 8 }}
                        />
                        المساحة :
                        <span style={{ marginLeft: 3, marginRight: 2 }}>
                          {house.space} متر2
                        </span>
                      </Typography>
                      <Typography
                        style={{ marginTop: 15 }}
                        variant='p'
                        component='h6'
                      >
                        <HomeOutlined
                          style={{ color: 'orangered', marginRight: 4 }}
                        />
                        نوع المبني :{' '}
                        <span style={{ marginTop: 15, marginLeft: 3 }}>
                          {house.building_type}
                        </span>
                      </Typography>
                      {house.property_type === 'Sell' ? (
                        <Typography
                          style={{ marginTop: 15 }}
                          variant='p'
                          component='h6'
                        >
                          <PriceCheck
                            style={{ color: 'orangered', marginRight: 4 }}
                          />
                          <span>السعر : </span>
                          <NumberFormat
                            value={house.price}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'SD '}
                            renderText={(value, props) => (
                              <span {...props}>{value}</span>
                            )}
                          />
                        </Typography>
                      ) : (
                        <Typography
                          style={{ marginTop: 15 }}
                          variant='p'
                          component='h6'
                        >
                          <PriceCheck
                            style={{ color: 'orangered', marginRight: 4 }}
                          />
                          السعر :
                          <NumberFormat
                            value={house.price}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'SD '}
                            renderText={(value, props) => (
                              <span {...props}>
                                {value}
                                {house.rent_type}
                              </span>
                            )}
                          />
                        </Typography>
                      )}
                      {house.status ? (
                        <Typography
                          style={{ marginTop: 15 }}
                          variant='p'
                          component='h6'
                        >
                          <CheckCircle
                            style={{ color: 'orangered', marginRight: 4 }}
                          />
                          الحالة :{' '}
                          <span
                            className='bg-primary'
                            style={{ marginTop: 15, marginLeft: 3 }}
                          >
                            متاح
                          </span>
                        </Typography>
                      ) : (
                        <Typography
                          style={{ marginTop: 15 }}
                          variant='p'
                          component='h6'
                        >
                          <NotAccessible
                            style={{ color: 'orangered', marginRight: 4 }}
                          />
                          الحالة :{' '}
                          <span
                            className='bg-danger'
                            style={{ marginTop: 15, marginLeft: 3 }}
                          >
                            غير متاح
                          </span>
                        </Typography>
                      )}
                    </div>
                  </div>
                  {house?.info?.length > 0 && (
                    <div className='.col-6 col-md-4  mee'>
                      <Typography
                        className='mds'
                        style={{ marginBottom: 30 }}
                        textAlign='left'
                        variant='h4'
                        component='h2'
                      >
                        <span style={{ marginLeft: 4 }}>الأضافات</span>
                      </Typography>
                      {house?.info?.map(({ name, id }) => (
                        <div key={id}>
                          <Typography variant='p' component='h6'>
                            <CheckBox
                              style={{ color: 'orangered', marginTop: 4 }}
                            />
                            {name}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className=''>
                <Typography
                  variant='h4'
                  component='h1'
                  style={{ marginTop: 30 }}
                  textAlign='center'
                >
                  الأتصال بالعميل
                </Typography>
                <TeamCard key={house?.Agent} member={house?.Agent} />
              </div>
              {house?.Related?.length > 0 && (
                <div>
                  <Typography
                    variant='h4'
                    component='h1'
                    style={{ marginTop: 60 }}
                    textAlign='center'
                  >
                    عقارات فى المنطقة
                  </Typography>
                  <Slider {...settings}>
                    {house?.Related?.map((hou) => (
                      <HouseCard key={hou.id} hou={hou} />
                    ))}
                  </Slider>
                </div>
              )}
            </div>
          </div>
          <div className='comment'>
            <Typography
              variant='h4'
              component='h1'
              style={{ marginTop: 5 }}
              textAlign='left'
            >
              التعليقات ({house?.comment?.length})
            </Typography>
            <Paper>
              {user ? (
                <ComentMSG Proper={house?.id} />
              ) : (
                <Typography
                  variant='h5'
                  component='h3'
                  style={{ marginTop: 20 }}
                  textAlign='left'
                >
                  سجل الدخول للتعليق
                </Typography>
              )}

              {parnetComent?.map((com) => (
                <Comment
                  proper={house?.id}
                  key={com.id}
                  com={com}
                  replays={getreplay(com.id)}
                />
              ))}
            </Paper>
          </div>
        </div>
      </section>
    </>
  )
}

export default PropertyDetail
