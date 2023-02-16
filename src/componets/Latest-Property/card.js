import * as React from 'react'
import NumberFormat from 'react-number-format'
import { Box, Paper, Typography } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import { FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { MdOutlineBed } from 'react-icons/md'
import millify from 'millify'
import { Link } from 'react-router-dom'

const url = process.env.REACT_APP_POINT

const HouseCard = ({ hou }) => {
  return (
    <Paper style={{ margin: 10 }} elevation={5}>
      <CardMedia
        component='img'
        height='300'
        image={`${url}${hou.cover}`}
        alt={hou.title}
      />
      <Link
        style={{ textDecoration: 'none', color: 'inherit' }}
        to={`/detail/${hou.slug}`}
      >
        <Box padding={1}>
          <Typography variant='h6'>{hou.title}</Typography>
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
        </Box>
        <Box style={{ backgroundColor: 'primary', borderTop: '1', padding: 2 }}>
          <Box
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '300px',
              color: 'blue.400',
            }}
          >
            {hou.num_rooms} Room <MdOutlineBed />| {hou.bathrooms} Bathroom
            <FaBath /> | {millify(hou.space)} sqft <BsGridFill />
          </Box>
        </Box>
      </Link>
    </Paper>
  )
}

export default HouseCard
