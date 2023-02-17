import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { Tooltip, ThemeProvider, Avatar } from '@mui/material'
import {
  BedRounded,
  Book,
  Dashboard,
  Edit,
  HomeOutlined,
  House,
  Image,
  Logout,
  PeopleAlt,
  PostAdd,
  AddBox,
} from '@mui/icons-material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ColorModeContex } from '../../componets/Theme'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import Main from './Main'
import Stepss from '../../componets/Stepps'
import Users from './Users'
import AddBlog from '../add-Blog'
import AddImages from '../Add images'
import Propertes from './propertes'
import Blogs from './blogs'
import { HasPerm } from './Perms'
import AddExtra from './AddExtra'
const ImgApi = process.env.REACT_APP_IMAGE_URL

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export default function MiniDrawer() {
  const { mode, toggleColorMode } = React.useContext(ColorModeContex)
  const {
    state: { user },
    dispatch,
  } = React.useContext(GlobalAuth)
  const [open, setOpen] = React.useState(false)
  const [selects, setselected] = React.useState('')

  const navigate = useNavigate()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const SiList = React.useMemo(
    () =>
      HasPerm(user)
        ? [
            {
              title: 'main',
              icon: <Dashboard />,
              link: '',
              component: <Main {...{ setselected, link: '' }} />,
            },
            {
              title: 'Add Property',
              icon: <BedRounded />,
              link: 'addproperty',
              component: <Stepss {...{ setselected, link: 'addproperty' }} />,
            },
            {
              title: 'Add Blog ',
              icon: <PostAdd />,
              link: 'addblog',
              component: <AddBlog {...{ setselected, link: 'addblog' }} />,
            },
            {
              title: 'Images',
              icon: <Image />,
              link: 'images',
              component: <AddImages {...{ setselected, link: 'images' }} />,
            },
            {
              title: 'extra',
              icon: <AddBox />,
              link: 'extra',
              component: <AddExtra {...{ setselected, link: 'extra' }} />,
            },
            {
              title: 'users',
              icon: <PeopleAlt />,
              link: 'users',
              component: <Users {...{ setselected, link: 'users' }} />,
            },
            {
              title: ' update Property',
              icon: <Edit />,
              link: 'propertes',
              component: <Propertes {...{ setselected, link: 'propertes' }} />,
            },
            {
              title: ' update Blog',
              icon: <Book />,
              link: 'blogs',
              component: <Blogs {...{ setselected, link: 'blogs' }} />,
            },
          ]
        : [
            {
              title: 'Add Property',
              icon: <BedRounded />,
              link: 'addproperty',
              component: <Stepss {...{ setselected, link: 'addproperty' }} />,
            },
            {
              title: ' update Property',
              icon: <House />,
              link: 'propertes',
              component: <Propertes {...{ setselected, link: 'propertes' }} />,
            },
            {
              title: 'Images',
              icon: <Image />,
              link: 'images',
              component: <AddImages {...{ setselected, link: 'images' }} />,
            },
            {
              title: 'extra',
              icon: <AddBox />,
              link: 'extra',
              component: <AddExtra {...{ setselected, link: 'extra' }} />,
            },
          ],
    []
  )

  return (
    <ThemeProvider theme={mode}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='fixed' open={open}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Tooltip title='Bach Homepage'>
              <IconButton onClick={() => navigate('/')} sx={{ mr: 1 }}>
                <HomeOutlined />
              </IconButton>
            </Tooltip>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ flexGrow: 1 }}
            >
              Dashbord
            </Typography>
            <IconButton onClick={toggleColorMode} color='inherit'>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {SiList.map((item) => (
              <ListItem
                key={item.title}
                disablePadding
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => navigate(item.link)}
                  selected={selects === item.link}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ mx: 'auto', mt: 3, mb: 1 }}>
            <Tooltip
              onClick={() =>
                dispatch({ type: 'update_profile', payload: { open: true } })
              }
              title={user ? user.username : ''}
            >
              <Avatar
                {...(open && { sx: { width: 100, height: 100 } })}
                src={`${ImgApi}${user.image}`}
              />
            </Tooltip>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            {open && <Typography>{user?.username}</Typography>}
            <Typography componet='h5' variant='body2'>
              {user?.user_type}
            </Typography>
            {open && <Typography variant='body2'>{user?.email}</Typography>}
            <Tooltip title='Logout'>
              <IconButton onClick={() => dispatch({ type: 'reset_user' })}>
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        </Drawer>
        <Box component='main' sx={{ flexGrow: 1, p: 0.5, mt: -5 }}>
          <DrawerHeader />
          <Routes>
            {SiList?.map((item) => (
              <Route
                key={item.title}
                path={item.link}
                element={item.component}
              />
            ))}
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
