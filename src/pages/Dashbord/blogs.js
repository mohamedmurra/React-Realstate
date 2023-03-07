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
import BlogActions from './BlogActions'
import { GlobalAuth } from '../../componets/UserContext/Provider'
const ImgApi = process.env.REACT_APP_IMAGE_URL

function Blogs({ link, setselected }) {
  const PrivateApi = usePrivateRoute()
  const { dispatch } = useContext(GlobalAuth)

  const [post, setpost] = useState([])
  const [pageSize, setpageSize] = useState(5)

  const colum = useMemo(
    () => [
      {
        field: 'image',
        headerName: 'Image',
        widht: 60,
        renderCell: (params) => (
          <Avatar variant='rounded' src={`${ImgApi}${params.row.image}`} />
        ),
        sartable: false,
        filterable: false,
      },
      { field: 'id', headerName: 'ID', widht: 100 },
      { field: 'title', headerName: 'Title', widht: 300 },
      {
        field: 'catagory',
        headerName: 'Catagory',
        widht: 100,
        renderCell: (params) => params.row.catagory.name,
      },
      { field: 'description', headerName: 'Description', widht: 300 },
      { field: 'slug', headerName: 'Slug', widht: 100 },
      {
        field: 'created',
        headerName: 'Date Created',
        widht: 220,
        renderCell: (params) =>
          moment(params.row.created).format('YYYY-MM-DD HH:mm'),
      },
      {
        field: 'auther.image',
        headerName: 'Add By',
        widht: 50,
        renderCell: (params) => (
          <Tooltip title={params.row.auther?.username}>
            <Avatar src={`${ImgApi}${params.row.auther?.image}`} />
          </Tooltip>
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        type: 'actions',
        renderCell: (params) => <BlogActions {...{ params, post, setpost }} />,
        sartable: false,
        filterable: false,
      },
    ],
    [post]
  )

  const getblogss = async () => {
    dispatch({ type: 'start_loading' })
    const { data } = await PrivateApi.get('api/blog/admin/')
    setpost(data.results)
    dispatch({ type: 'end_loading' })
  }

  useEffect(() => {
    document.title = 'قائمة المنشورات'
    getblogss()

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
          Manage Blog Post
        </Typography>
        <DataGrid
          onPageSizeChange={(num) => setpageSize(num)}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          columns={colum}
          rows={post}
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

export default Blogs
