import React from 'react'
import { HomeSharp, AccessTimeRounded, PaidOutlined } from '@mui/icons-material'
import { Typography, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const OurServies = () => {
  const { t } = useTranslation()
  return (
    <div className='Now-servies'>
      <Container style={{ marginTop: 20 }}>
        <Typography
          variant='h4'
          style={{ color: 'inhert', marginTop: 30, marginBottom: 25 }}
          component='h5'
          textAlign='center'
        >
          <span style={{ borderBottom: '1px solid #B00020' }}>
            {' '}
            {t('services')}
          </span>
        </Typography>
      </Container>
      <div className='container icon-box pro-content'>
        <div className='row'>
          <div className='col-12 col-md-4 text-center'>
            <HomeSharp style={{ fontSize: '5rem' }} />
            <Typography style={{ marginLeft: 20 }} variant='h4' component='h5'>
              {t('s-sel')}
            </Typography>
            <Typography
              style={{ marginTop: 10, color: 'inherit' }}
              variant='subtitle2'
              component='p'
            >
              {t('s-sel-1')}
              <br />
              {t('s-sel-2')}
              <br />{' '}
              <span style={{ marginRight: 20, textAlign: 'center' }}>
                {' '}
                {t('s-sel-3')}
              </span>{' '}
            </Typography>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to='/about-us'
            >
              <Typography style={{ marginTop: 15 }} variant='p' component='h5'>
                {t('s-m')} <FaAngleDoubleRight style={{ fontSize: '.5rem' }} />
              </Typography>
            </Link>
          </div>
          <div className='col-12 col-md-4 text-center'>
            <PaidOutlined style={{ fontSize: '5rem' }} />
            <Typography style={{ marginLeft: 20 }} variant='h4' component='h5'>
              {t('s-buy')}
            </Typography>
            <Typography
              style={{ marginTop: 10, color: 'inherit' }}
              variant='subtitle2'
              component='p'
            >
              {t('s-buy-1')}
              <br /> {t('s-buy-2')}
              <br />{' '}
              <span style={{ marginRight: 20, textAlign: 'center' }}>
                {t('s-buy-3')}
              </span>{' '}
            </Typography>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to='/about-us'
            >
              <Typography style={{ marginTop: 15 }} variant='p' component='h5'>
                {t('s-m')}
                <FaAngleDoubleRight style={{ fontSize: '.5rem' }} />
              </Typography>
            </Link>
          </div>
          <div className='col-12 col-md-4 text-center'>
            <AccessTimeRounded style={{ fontSize: '5rem' }} />
            <Typography style={{ marginLeft: 20 }} variant='h4' component='h5'>
              {t('s-ren')}
            </Typography>
            <Typography
              style={{ marginTop: 10, color: 'inherit' }}
              variant='subtitle2'
              component='p'
            >
              {t('s-ren-1')}
              <br />
              {t('s-ren-2')}
              <br />{' '}
              <span style={{ marginRight: 20, textAlign: 'center' }}>
                {t('s-ren-3')}
              </span>{' '}
            </Typography>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to='/about-us'
            >
              <Typography style={{ marginTop: 15 }} variant='p' component='h5'>
                {t('s-m')}
                <FaAngleDoubleRight style={{ fontSize: '.5rem' }} />
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurServies
