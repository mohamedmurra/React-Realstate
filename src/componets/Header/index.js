import * as React from 'react'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ColorModeContex } from '../Theme/index'
import { Link } from 'react-router-dom'
import UserMenu from './UserMenu'
import { GlobalAuth } from '../UserContext/Provider'

const Header = () => {
  const {
    state: { user },
  } = React.useContext(GlobalAuth)
  const { mode, toggleColorMode } = React.useContext(ColorModeContex)
  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h2'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Typography
              component='h1'
              sx={{ paddingRight: 0.5 }}
              color={'inherit'}
            >
              <Link style={{ textDecoration: 'none', color: 'gold' }} to='/'>
                Murra
              </Link>
            </Typography>
            <Typography component='h1' color={'gold'}>
              {' '}
              للعقارات
            </Typography>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to='/'
                  >
                    الرئيسية
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to='/main'
                  >
                    العقارات
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to='/Blog'
                  >
                    الصحيفة
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to='/Agents'
                  >
                    العملاء
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to='/Mapp'
                  >
                    الخريطة
                  </Link>
                </Typography>
              </MenuItem>
              {user && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>
                    <Link
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      to='/faver'
                    >
                      المفضلات
                    </Link>
                  </Typography>
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to='/about-us'
                  >
                    حول الموقع
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to='/contact'
                  >
                    الأتصال بنا
                  </Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant='h2'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Typography
              component='h1'
              sx={{ paddingRight: 0.5 }}
              color={'inherit'}
            >
              <Link style={{ textDecoration: 'none', color: 'gold' }} to='/'>
                Murra
              </Link>
            </Typography>
            <Typography component='h1' color={'gold'}>
              {' '}
              للعقارات
            </Typography>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>
                الرئيسية
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to='/main'
              >
                العقارات
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to='/blog'
              >
                الصحيفة
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to='/Agents'
              >
                العملاء
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to='/Mapp'
              >
                الخريطة
              </Link>
            </Button>
            {user && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  to='/faver'
                >
                  المفضلات
                </Link>
              </Button>
            )}
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to='/contact'
              >
                الأتصال بنا
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to='/about-us'
              >
                حول الموقع
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              sx={{ mr: 1 }}
              onClick={toggleColorMode}
              color='inherit'
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <UserMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
