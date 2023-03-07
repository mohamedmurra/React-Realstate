import {
  Avatar,
  Container,
  gridClasses,
  Tooltip,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import usePrivateRoute from '../../hooks.js/usePrivateRoute'
import { grey } from '@mui/material/colors'
import NumberFormat from 'react-number-format'
import RoomActions from './RoomActions'
import { GlobalAuth } from '../../componets/UserContext/Provider'
const ImgApi = process.env.REACT_APP_IMAGE_URL

function Propertes({ link, setselected }) {
  const PrivateApi = usePrivateRoute()
  const {
    state: { editing },
    dispatch,
  } = useContext(GlobalAuth)

  const [rooms, setrooms] = useState([])
  const [pageSize, setpageSize] = useState(5)

  const colum = useMemo(
    () => [
      {
        field: 'cover',
        headerName: 'cover',
        width: 60,
        renderCell: (params) => (
          <Avatar variant='rounded' src={`${ImgApi}${params.row.cover}`} />
        ),
        sartable: false,
        filterable: false,
      },
      {
        field: 'price',
        headerName: 'Price',
        width: 100,
        renderCell: (params) => (
          <NumberFormat
            value={params.row.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$ '}
            renderText={(value, props) => (
              <span style={{ fontSize: '0.8rem' }} {...props}>
                {value}
              </span>
            )}
          />
        ),
      },
      { field: 'title', headerName: 'Title', width: 150 },
      {
        field: 'aria',
        headerName: 'Aria',
        width: 100,
        renderCell: (params) => params.row.aria.name,
      },
      {
        field: 'building_type',
        headerName: 'Building Type',
        width: 100,
        renderCell: (params) => params.row.building_type.name,
      },
      {
        field: 'property_type',
        headerName: 'Property Type',
        width: 150,
        renderCell: (params) => params.row.property_type.name,
      },
      { field: 'space', headerName: 'Space', width: 100 },
      {
        field: 'Agent.image',
        headerName: 'Add By',
        width: 60,
        renderCell: (params) => (
          <Tooltip title={params.row.Agent?.username}>
            <Avatar src={`${ImgApi}${params.row.Agent?.image}`} />
          </Tooltip>
        ),
      },
      {
        field: 'created',
        headerName: 'Date Created',
        width: 160,
        renderCell: (params) =>
          moment(params.row.created).format('YYYY-MM-DD HH:mm'),
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 100,
        type: 'boolean',
      },

      {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        type: 'actions',
        renderCell: (params) => (
          <RoomActions {...{ params, rooms, setrooms }} />
        ),
        sartable: false,
        filterable: false,
      },
    ],
    [rooms, editing]
  )

  const getrooms = async () => {
    dispatch({ type: 'start_loading' })
    const { data } = await PrivateApi.get('api/home/admin/')
    setrooms(data)
    dispatch({ type: 'end_loading' })
  }

  useEffect(() => {
    document.title = 'قائمة العقارات'
    getrooms()

    setselected(link)
  }, [])

  return (
    <Container >
      <Box sx={{ height: 400, width: '100%' }}>
        <Typography
          variant='h3'
          component='h3'
          sx={{
            textAlign: 'center',
            mt: 3,
            mb: 3,
            fontSize: { xs: '2rem', md: '2.9rem' },
          }}
        >
          Manage Propertys
        </Typography>
        <DataGrid
          onPageSizeChange={(num) => setpageSize(num)}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          columns={colum}
          rows={rooms}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
            left: params.isLastVisible ? 5 : 0,
            right: params.isFirstVisible ? 5 : 0,
          })}
          rowSpacingType='margin'
          getRowId={(e) => e.id}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? grey[200] : grey[500],
            },
          }}
        />
      </Box>
    </Container>
  )
}

export default Propertes
