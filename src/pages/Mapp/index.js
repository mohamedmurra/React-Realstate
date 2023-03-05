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
import Supercluster from 'supercluster'
import './cluster.css'

const MapApi = process.env.REACT_APP_MapBox
const ImgApi = process.env.REACT_APP_IMAGE_URL

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
})

const Mapp = () => {
  const [propertys, setpropertys] = useState([])
  const [popup, setpopup] = useState(null)
  const [clusters, setClusters] = useState([])
  const [zoom, setZoom] = useState(0)
  const [points, setPoints] = useState([])
  const [bounds, setBounds] = useState([-180, -85, 180, 85])
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
    supercluster.load(points)
    setClusters(supercluster.getClusters(bounds, zoom))
  }, [points, zoom, bounds])

  useEffect(() => {
    const points = propertys.map((room) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        roomId: room.id,
        price: room.price,
        title: room.title,
        description: room.description,
        lng: room.long,
        lat: room.lati,
        images: room.images,
        uPhoto: room.cover,
        slug: room.slug,
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(room.long), parseFloat(room.lati)],
      },
    }))
    setPoints(points)
  }, [propertys])

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

  useEffect(() => {
    if (mapref.current) {
      setBounds(mapref.current.getMap().getBounds().toArray().flat())
    }
  }, [mapref?.current])

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
          }}
          mapboxAccessToken={MapApi}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
        >
          {clusters?.map((cluster) => {
            const { cluster: isCluster, point_count } = cluster.properties
            const [longitude, latitude] = cluster.geometry.coordinates
            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  longitude={longitude}
                  latitude={latitude}
                >
                  <div
                    className='cluster-marker'
                    style={{
                      width: `${10 + (point_count / points.length) * 20}px`,
                      height: `${10 + (point_count / points.length) * 20}px`,
                    }}
                    onClick={() => {
                      const zoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      )
                      mapref.current.flyTo({
                        center: [longitude, latitude],
                        zoom,
                        speed: 1,
                      })
                    }}
                  >
                    {point_count}
                  </div>
                </Marker>
              )
            }
            return (
              <Marker
                key={`room-${cluster.properties.roomId}`}
                longitude={longitude}
                latitude={latitude}
              >
                <Tooltip title={cluster.properties.title}>
                  <Avatar
                    src={`${ImgApi}${cluster.properties.uPhoto}`}
                    component={Paper}
                    elevation={2}
                    onClick={() => {
                      setpopup(cluster.properties)
                    }}
                  />
                </Tooltip>
              </Marker>
            )
          })}
          <NavigationControl position='bottom-right' />
          <GeolocateControl
            position='bottom-left'
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
              latitude={popup.lng}
              longitude={popup.lat}
              maxWidth='auto'
              closeOnClick={false}
              focusAfterOpen={false}
              onClose={() => setpopup(null)}
            >
              <ProSlider {...{ popup }} />
            </Popup>
          )}
        </Map>
      </Box>
    </Box>
  )
}

export default Mapp
