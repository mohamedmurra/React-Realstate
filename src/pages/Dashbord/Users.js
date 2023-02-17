import { Avatar, Container, gridClasses, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import React, { useEffect, useMemo, useState, useContext } from 'react'
import usePrivateRoute from '../../hooks.js/usePrivateRoute'
import { grey } from '@mui/material/colors'
import UserActions from './UserActions'
import { GlobalAuth } from '../../componets/UserContext/Provider'

const url = process.env.REACT_APP_POINT
const ImgApi = process.env.REACT_APP_IMAGE_URL

function Users({ link, setselected }) {
  const PrivateApi = usePrivateRoute()
  const {
    state: { user },
  } = useContext(GlobalAuth)

  const [users, setusers] = useState([])
  const [pageSize, setpageSize] = useState(5)
  const [rowActivae, setrowActivae] = useState(null)

  const colum = useMemo(
    () =>
      user.user_type === 'ADMIN'
        ? [
            {
              field: 'image',
              headerName: 'Avatar',
              width: 60,
              renderCell: (params) => (
                <Avatar src={`${ImgApi}${params.row.image}`} />
              ),
              sartable: false,
              filterable: false,
            },
            { field: 'username', headerName: 'User Name', width: 100 },
            { field: 'email', headerName: 'email', width: 150 },
            {
              field: 'user_type',
              headerName: 'Role',
              width: 150,
              type: 'singleSelect',
              valueOptions: ['CUSTOMER', 'AGENT', 'STAFF', 'ADMIN'],
              editable: true,
            },
            { field: 'phone_number', headerName: 'Phone', width: 100 },
            { field: 'gender', headerName: 'Gender', width: 100 },
            {
              field: 'is_active',
              headerName: 'Active',
              width: 100,
              type: 'boolean',
              editable: true,
            },
            {
              field: 'is_staff',
              headerName: 'Staff',
              width: 100,
              type: 'boolean',
              editable: true,
            },
            { field: 'id', headerName: 'ID', width: 100 },
            {
              field: 'date_joined',
              headerName: 'Date Joined',
              width: 200,
              renderCell: (params) =>
                moment(params.row.date_joined).format('YYYY-MM-DD HH:mm'),
            },
            {
              field: 'actions',
              headerName: 'Actions',
              width: 100,
              type: 'actions',
              renderCell: (params) => (
                <UserActions {...{ params, rowActivae, setrowActivae }} />
              ),
              sartable: false,
              filterable: false,
            },
          ]
        : [
            {
              field: 'image',
              headerName: 'Avatar',
              width: 60,
              renderCell: (params) => (
                <Avatar src={`${ImgApi}${params.row.image}`} />
              ),
              sartable: false,
              filterable: false,
            },
            { field: 'username', headerName: 'User Name', width: 100 },
            { field: 'email', headerName: 'email', width: 150 },
            {
              field: 'user_type',
              headerName: 'Role',
              width: 150,
              type: 'singleSelect',
              valueOptions: ['CUSTOMER', 'AGENT', 'STAFF', 'ADMIN'],
              editable: true,
            },
            { field: 'phone_number', headerName: 'Phone', width: 100 },
            { field: 'gender', headerName: 'Gender', width: 100 },
            {
              field: 'is_active',
              headerName: 'Active',
              width: 100,
              type: 'boolean',
              editable: true,
            },
            { field: 'id', headerName: 'ID', width: 100 },
            {
              field: 'date_joined',
              headerName: 'Date Joined',
              width: 200,
              renderCell: (params) =>
                moment(params.row.date_joined).format('YYYY-MM-DD HH:mm'),
            },
            {
              field: 'actions',
              headerName: 'Actions',
              width: 100,
              type: 'actions',
              renderCell: (params) => (
                <UserActions {...{ params, rowActivae, setrowActivae }} />
              ),
              sartable: false,
              filterable: false,
            },
          ],
    [rowActivae]
  )

  const getusers = async () => {
    const { data } = await PrivateApi.get('viewset/users/')
    setusers(data)
  }

  useEffect(() => {
    document.title = 'قائمة المستخدمين'
    getusers()
    setselected(link)
  }, [])

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Box sx={{ height: 450, width: '100%' }}>
        <Typography
          variant='h3'
          component='h3'
          sx={{
            textAlign: 'center',
            mb: 3,
            fontSize: { xs: '2rem', md: '2.9rem' },
          }}
        >
          Manage Users
        </Typography>
        <DataGrid
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
            left: params.isLastVisible ? 5 : 0,
            right: params.isFirstVisible ? 5 : 0,
          })}
          rowSpacingType='margin'
          onPageSizeChange={(num) => setpageSize(num)}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          columns={colum}
          rows={users}
          getRowId={(e) => e.id}
          onCellEditCommit={(params) => setrowActivae(params.id)}
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

export default Users
