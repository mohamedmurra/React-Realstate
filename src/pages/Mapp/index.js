import React, { useContext, useEffect, useRef, useState } from 'react'
import { Avatar, Box, Paper, Tooltip } from '@mui/material'
import {
  Map,
  Marker,
  NavigationControl,
  GeolocateControl,
  Popup,
} from 'react-map-gl'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import 'mapbox-gl/dist/mapbox-gl.css'
import api from '../../utils/fetching'
import ProSlider from './ProSlider'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapApi = process.env.REACT_APP_MapBox

const Mapp = () => {
  const [propertys, setpropertys] = useState([])
  const [popup, setpopup] = useState(null)
  const {
    state: {
      mapp: { lati, long },
    },
    dispatch,
  } = useContext(GlobalAuth)
  const mapref = useRef()

  const getdata = async () => {
    try {
      let { data } = await api.get('api/home/all/')
      setpropertys(data)
    } catch (error) {
      if (!error.response) {
        dispatch({
          type: 'alert',
          payload: {
            open: true,
            severity: 'error',
            message: 'No Server Response',
          },
        })
      }
      dispatch({ type: 'end_loading' })
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'error',
          message: error.response.statusText,
        },
      })
    }
  }

  useEffect(() => {
    document.title = ' الخريطة'
    if (!lati && !long) {
      fetch('https://ipapi.co/json')
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          dispatch({
            type: 'update_mapp',
            payload: { long: data.longitude, lati: data.latitude },
          })
        })
    }
    getdata()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '81vh',
      }}
    >
      <Box
        sx={{
          width: '95vw',
          height: '75.2vh',
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
          {propertys?.map((pro) => (
            <>
              <Marker key={pro.slug} longitude={pro.long} latitude={pro.lati} />
              <Tooltip title={pro.title}>
                <Avatar
                  src={pro.Agent.image}
                  component={Paper}
                  elevation={2}
                  onClick={() => {
                    setpopup(pro)
                  }}
                />
              </Tooltip>
            </>
          ))}
          <NavigationControl position='bottom-right' />
          <GeolocateControl
            position='top-left'
            trackUserLocation
            onGeolocate={(e) =>
              dispatch({
                type: 'update_mapp',
                payload: { long: e.coords.longitude, lati: e.coords.latitude },
              })
            }
          />
          {popup && (
            <Popup
              latitude={popup.lati}
              longitude={popup.long}
              maxWidth='auto'
              closeOnClick={false}
              focusAfterOpen={false}
              onClose={() => setpopup(null)}
            >
              <ProSlider info={popup} />
            </Popup>
          )}
        </Map>
      </Box>
    </Box>
  )
}

export default Mapp
