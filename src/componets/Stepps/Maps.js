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
      editing,
    },
    dispatch,
  } = useContext(GlobalAuth)
  const mapref = useRef()

  useEffect(() => {
    console.log(lati, long)
    if (!lati && !long) {
      fetch('https://ipapi.co/json')
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          mapref.current.flyTo({
            center: [data.longitude, data.latitude],
          })
          editing
            ? dispatch({
                type: 'updated_room',
                payload: { long: data.longitude, lati: data.latitude },
              })
            : dispatch({
                type: 'update_detail',
                payload: { long: data.longitude, lati: data.latitude },
              })
        })
    }
  }, [])

  useEffect(() => {
    if ((long || lati) && mapref.current) {
      mapref.current.flyTo({
        center: [long, lati],
      })
    }
  }, [long, lati])

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
            latitude: lati,
            longitude: long,
            zoom: 3,
          }}
          mapboxAccessToken={MapApi}
          mapStyle='mapbox://styles/mapbox/streets-v11'
        >
          <Marker
            draggable
            onDragEnd={(e) => {
              editing
                ? dispatch({
                    type: 'updated_room',
                    payload: { long: e.lngLat.lng, lati: e.lngLat.lat },
                  })
                : dispatch({
                    type: 'update_detail',
                    payload: { long: e.lngLat.lng, lati: e.lngLat.lat },
                  })
            }}
            longitude={long ? long : 30.214}
            latitude={lati ? lati : 12.242}
          />

          <NavigationControl position='bottom-right' />
          <GeolocateControl
            position='top-left'
            trackUserLocation
            onGeolocate={(e) => {
              editing
                ? dispatch({
                    type: 'updated_room',
                    payload: {
                      long: e.coords.longitude,
                      lati: e.coords.latitude,
                    },
                  })
                : dispatch({
                    type: 'update_detail',
                    payload: {
                      long: e.coords.longitude,
                      lati: e.coords.latitude,
                    },
                  })
            }}
          />
        </Map>
      </Box>
    </Box>
  )
}

export default Maps
