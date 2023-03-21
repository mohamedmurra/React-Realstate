import React, { useContext } from 'react'
import {
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  Button,
} from '@mui/material'
import { Lock } from '@mui/icons-material'
import { GlobalAuth } from '../UserContext/Provider'
import Login from '../../pages/Login'
import { useNavigate } from 'react-router-dom'
import { HasPerm } from '../../pages/Dashbord/Perms'
import Profile from '../../pages/Profile'
import { useTranslation } from 'react-i18next'
import { Dropdown } from 'bootstrap'

const ImgApi = process.env.REACT_APP_IMAGE_URL
const UserMenu = () => {
  const { t } = useTranslation()
  const AuthVal = useContext(GlobalAuth)
  const {
    state: { user },
    dispatch,
  } = AuthVal

  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handlelogout = () => {
    dispatch({ type: 'reset_user' })
    setAnchorElUser(null)
  }

  const navigate = useNavigate()
  return (
    <>
      {!user ? (
        <Tooltip title={t('login-')}>
          <Button
            color='inherit'
            startIcon={<Lock />}
            onClick={() => dispatch({ type: 'open_login' })}
          >
            {t('h-log')}
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {!user.image ? (
              <Avatar alt={user.username} />
            ) : (
              <Avatar alt={user.username} src={`${ImgApi}${user.image}`} />
            )}
          </IconButton>
        </Tooltip>
      )}

      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {user && (
          <>
            <MenuItem
              onClick={() => {
                dispatch({ type: 'update_profile', payload: { open: true } })
                setAnchorElUser(null)
              }}
            >
              <Typography textAlign='center'>{t('h-profile')}</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(
                  HasPerm(user) ? '/admin-panel' : '/admin-panel/addproperty'
                )
                setAnchorElUser(null)
              }}
            >
              <Typography textAlign='center'>{t('h-dash')}</Typography>
            </MenuItem>
            <MenuItem onClick={handlelogout}>
              <Typography textAlign='center'>{t('h-out')}</Typography>
            </MenuItem>
          </>
        )}

        <Login />
        <Profile />
      </Menu>
    </>
  )
}
export default UserMenu
