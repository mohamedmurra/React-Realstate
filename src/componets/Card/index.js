import * as React from 'react'
import NumberFormat from 'react-number-format'
import { Box, Button, Paper, Typography } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import { FaBath, FaHeart } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { MdOutlineBed } from 'react-icons/md'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import usePrivateRoute from '../../hooks.js/usePrivateRoute'
import { useContext } from 'react'
import { GlobalAuth } from '../UserContext/Provider'
const url = process.env.REACT_APP_POINT
const ImgApi = process.env.REACT_APP_IMAGE_URL
const HouseCard = ({ hou }) => {
  const {
    dispatch,
    state: { user, fave },
  } = useContext(GlobalAuth)
  const PrivateRoute = usePrivateRoute()
  const getFave = async () => {
    try {
      await PrivateRoute.post(
        `${url}api/home/fav/${
          hou.favourties.includes(user.id) ? 'remove' : 'add'
        }/`,
        {
          slug: hou.slug,
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
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      layout
    >
      <Paper style={{ margin: 10 }} elevation={5}>
        <CardMedia
          component='img'
          height='300'
          image={`${ImgApi}${hou.cover}`}
          alt={hou.title}
        />

        <Box padding={1}>
          <Link
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={`/detail/${hou.slug}`}
          >
            <Typography variant='h6'>{hou.title}</Typography>
          </Link>
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <NumberFormat
              value={hou.price}
              className='foo'
              displayType={'text'}
              thousandSeparator={true}
              prefix={'SD '}
              renderText={(value, props) => (
                <Typography variant='subtitle1' component='h4' {...props}>
                  {value} / {hou.rent_type ? hou.rent_type : 'للبيع'}
                </Typography>
              )}
            />
            {user && (
              <Button
                onClick={() => getFave()}
                sx={{ marinRight: 20, color: 'inherit' }}
              >
                <FaHeart
                  size={25}
                  color={hou.favourties.includes(user.id) ? 'red' : 'grey'}
                />
              </Button>
            )}
          </div>
        </Box>
        <Box padding={2} style={{ backgroundColor: 'primary', borderTop: '1' }}>
          <Box
            alignItems='center'
            justifyContent='space-between'
            w='300px'
            color='blue.400'
            display='flex'
          >
            {hou.num_rooms} Room <MdOutlineBed />| {hou.bathrooms} Bathroom
            <FaBath /> | {millify(hou.space)} sqft <BsGridFill />
          </Box>
        </Box>
      </Paper>
    </motion.div>
  )
}

export default HouseCard
