import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ColorModeContex } from '../Theme/index'
import { Link } from 'react-router-dom'
import UserMenu from './UserMenu'
import { GlobalAuth } from '../UserContext/Provider'
import { useTranslation } from 'react-i18next'
import { FormControl, Select } from '@mui/material'

const Header = () => {
  const { t, i18n } = useTranslation()
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
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>
                Murra
              </Link>
            </Typography>
            <Typography component='h1' color={'gold'}>
              {' '}
              {t('web-Title')}
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
                    {t('h-Home')}
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to='/main'
                  >
                    {t('h-pro')}
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to='/Blog'
                  >
                    {t('h-blog')}
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to='/Agents'
                  >
                    {t('h-agent')}
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to='/Mapp'
                  >
                    {t('h-map')}
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
                      {t('h-fave')}
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
                    {t('h-about')}
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to='/contact'
                  >
                    {t('h-contact')}
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
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>
                Murra
              </Link>
            </Typography>
            <Typography component='h1' color={'gold'}>
              {' '}
              {t('web-Title')}
            </Typography>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>
                {t('h-Home')}
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
                {t('h-pro')}
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
                {t('h-blog')}
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
                {t('h-agent')}
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
                {t('h-map')}
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
                  {t('h-fave')}
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
                {t('h-contact')}
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
                {t('h-about')}
              </Link>
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mr: -2,
              gap: -0.2,
            }}
          >
            <FormControl size='small'>
              <Select
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                value={t('lang')}
                size='small'
                variant='standard'
                sx={{
                  boxShadow: 'none',
                  backgroundColor: 'inherit',
                  border: 'none',
                  color: '#fff',
                  '.MuiOutinedInput-notchedOutline': { border: 0 },
                }}
                disableUnderline={true}
                inputProps={{ IconComponet: () => null }}
              >
                <MenuItem sx={{ color: 'inherit' }} value='en'>
                  EN
                </MenuItem>
                <MenuItem sx={{ color: 'inherit' }} value='ar'>
                  AR
                </MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={toggleColorMode} color='inherit'>
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
