import React from 'react'
import { Box } from '@mui/material'
import { Map, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useContext } from 'react'
import { GlobalAuth } from '../UserContext/Provider'

const MapApi = process.env.REACT_APP_MapBox

const ProMap = ({ hou }) => {
  const {
    state: {
      mapp: { lati, long },
    },
  } = useContext(GlobalAuth)
  return (
    <Box
      sx={{
        width: 'auto',
        height: 360,
        position: 'relative',
      }}
    >
      <Map
        initialViewState={{
          latitude: hou.lati,
          longitude: hou.long,
          zoom: 15,
        }}
        mapboxAccessToken={MapApi}
        mapStyle='mapbox://styles/mapbox/streets-v11'
      >
        <Marker
          longitude={hou.long ? hou.long : long}
          latitude={hou.lati ? hou.lati : lati}
          draggable={false}
        />
      </Map>
    </Box>
  )
}

export default ProMap
