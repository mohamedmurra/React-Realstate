import React from 'react'
import { HomeSharp, AccessTimeRounded, PaidOutlined } from '@mui/icons-material'
import { Typography, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { FaAngleDoubleRight } from 'react-icons/fa'

const OurServies = () => {
  return (
    <div className='Now-servies'>
      <Container style={{ marginTop: 20 }}>
        <Typography
          variant='h4'
          style={{ color: 'inhert', marginTop: 30, marginBottom: 25 }}
          component='h5'
          textAlign='center'
        >
          <span style={{ borderBottom: '1px solid #B00020' }}> خدماتنا</span>
        </Typography>
      </Container>
      <div className='container icon-box pro-content'>
        <div className='row'>
          <div className='col-12 col-md-4 text-center'>
            <HomeSharp style={{ fontSize: '5rem' }} />
            <Typography style={{ marginLeft: 20 }} variant='h4' component='h5'>
              بيع العقارات
            </Typography>
            <Typography
              style={{ marginTop: 10, color: 'inherit' }}
              variant='subtitle2'
              component='p'
            >
              سجل فى الموقع أو تواصل مع الأدمن
              <br />
              لى أضافة عقارارك على الموقع وادارته وعرضه
              <br />{' '}
              <span style={{ marginRight: 20, textAlign: 'center' }}>
                {' '}
                لمجموعة متنوعة من العملاء{' '}
              </span>{' '}
            </Typography>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to='/about-us'
            >
              <Typography style={{ marginTop: 15 }} variant='p' component='h5'>
                قرأئة المزيد...{' '}
                <FaAngleDoubleRight style={{ fontSize: '.5rem' }} />
              </Typography>
            </Link>
          </div>
          <div className='col-12 col-md-4 text-center'>
            <PaidOutlined style={{ fontSize: '5rem' }} />
            <Typography style={{ marginLeft: 20 }} variant='h4' component='h5'>
              شراء عقار
            </Typography>
            <Typography
              style={{ marginTop: 10, color: 'inherit' }}
              variant='subtitle2'
              component='p'
            >
              نعرض لك مجموعة متنوعة من العقارات <br />
              لكي تختار بينها بمختلف الأسعار من أجل أيجاد
              <br />{' '}
              <span style={{ marginRight: 20, textAlign: 'center' }}>
                منزل الأحلام
              </span>{' '}
            </Typography>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to='/about-us'
            >
              <Typography style={{ marginTop: 15 }} variant='p' component='h5'>
                قرأئة المزيد ...{' '}
                <FaAngleDoubleRight style={{ fontSize: '.5rem' }} />
              </Typography>
            </Link>
          </div>
          <div className='col-12 col-md-4 text-center'>
            <AccessTimeRounded style={{ fontSize: '5rem' }} />
            <Typography style={{ marginLeft: 20 }} variant='h4' component='h5'>
              أيجار العقارات
            </Typography>
            <Typography
              style={{ marginTop: 10, color: 'inherit' }}
              variant='subtitle2'
              component='p'
            >
              نعرض لك مجموعة متنوعة من العقارات
              <br />
              نساعدك فى الأختيار والصيانة وابرام العقد و
              <br />{' '}
              <span style={{ marginRight: 20, textAlign: 'center' }}>
                تحديد الأسعار
              </span>{' '}
            </Typography>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to='/about-us'
            >
              <Typography style={{ marginTop: 15 }} variant='p' component='h5'>
                قرأئة المزيد ...{' '}
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
