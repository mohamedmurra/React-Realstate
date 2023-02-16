import React, { useContext, useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { Map, Marker, NavigationControl, GeolocateControl } from 'react-map-gl'
import { GlobalAuth } from '../UserContext/Provider'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapApi = process.env.REACT_APP_MapBox

const Maps = () => {
  const {
    state: {
      detail: { lati, long },
    },
    dispatch,
  } = useContext(GlobalAuth)
  const mapref = useRef()

  useEffect(() => {
    if (!lati && !long) {
      fetch('https://ipapi.co/json')
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          mapref.current.flyTo({
            center: [data.longitude, data.latitude],
          })
          dispatch({
            type: 'update_detail',
            payload: { long: data.longitude, lati: data.latitude },
          })
        })
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '70vw',
          height: '250px',
          position: 'relative',
          margin: 1,
        }}
      >
        <Map
          ref={mapref}
          initialViewState={{
            latitude: long,
            longitude: lati,
            zoom: 12,
          }}
          mapboxAccessToken={MapApi}
          mapStyle='mapbox://styles/mapbox/streets-v11'
        >
          <Marker
            draggable
            onDrag={(e) => {
              dispatch({
                type: 'update_detail',
                payload: { long: e.lngLat.lng, lati: e.lngLat.lat },
              })
            }}
            longitude={long}
            latitude={lati}
          />

          <NavigationControl position='bottom-right' />
          <GeolocateControl
            position='top-left'
            trackUserLocation
            onGeolocate={(e) =>
              dispatch({
                type: 'update_detail',
                payload: { long: e.coords.longitude, lati: e.coords.latitude },
              })
            }
          />
        </Map>
      </Box>
    </Box>
  )
}

export default Maps
