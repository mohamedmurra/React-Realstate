import { Group, MapsHomeWork } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import React, { useEffect, useContext, useState } from 'react'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import usePrivateRoute from '../../hooks.js/usePrivateRoute'
import moment from 'moment'
import RoomChart from './RoomChart'
import UsersChart from './UsersChart'

function Main({ link, setselected }) {
  const PrivateApi = usePrivateRoute()
  const {
    state: { users, rooms },
    dispatch,
  } = useContext(GlobalAuth)

  const getData = async () => {
    try {
      const { data } = await PrivateApi.get('api/dashbord/')
      dispatch({ type: 'update_rooms', payload: data.rooms })
      dispatch({ type: 'update_users', payload: data.users })
    } catch (error) {
      dispatch({
        type: 'alert',
        payload: {
          open: true,
          severity: 'error',
          message: error?.response?.statusText,
        },
      })
    }
  }

  useEffect(() => {
    document.title = 'صفحة الأدمن'
    getData()
    setselected(link)
  }, [])
  const url = process.env.REACT_APP_POINT
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: 'repeat(3,1fr)',
        gridAutoRows: 'minmax(100px,auto)',
        gap: 3,
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography
          sx={{ fontSize: { xs: '2rem', md: '2.9rem' } }}
          variant='h4'
        >
          Users
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant='h4'>{users?.length}</Typography>
        </Box>
      </Paper>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography
          sx={{ fontSize: { xs: '2rem', md: '2.9rem' } }}
          variant='h4'
        >
          Propertys
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MapsHomeWork sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant='h4'>{rooms?.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: '1/4' }}>
        <Box>
          <Typography variant='h5' component='h4'>
            Recently add Users
          </Typography>
          <List>
            {users?.slice(0, 4).map((ara, i) => (
              <Box key={ara.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={ara?.username} src={`${url}${ara?.image}`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={ara?.email}
                    secondary={`Created ${moment(ara.created).format(
                      'YYYY-MM-DD HH:mm'
                    )}`}
                  />
                </ListItem>
                {i !== 4 && <Divider variant='inset' />}
              </Box>
            ))}
          </List>
        </Box>
        <Divider sx={{ mt: 2, mb: 2, opacity: 0.7 }} />
        <Box>
          <Typography variant='h5' component='h4'>
            Recently add Propertys
          </Typography>
          <List>
            {rooms?.slice(0, 4).map((ara, i) => (
              <Box key={ara.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={ara?.title}
                      src={`${url}${ara?.cover}`}
                      variant='rounded'
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={ara?.title}
                    secondary={`Created ${moment(ara.created).fromNow()} By ${
                      ara?.Agent?.username
                    }`}
                  />
                </ListItem>
                {i !== 4 && <Divider variant='inset' />}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
        <RoomChart />
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
        <UsersChart />
      </Paper>
    </Box>
  )
}

export default Main
