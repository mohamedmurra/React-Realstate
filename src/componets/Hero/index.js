import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import imgd from '../../assets/italiian.jpg'
import { Collapse, CssBaseline } from '@mui/material'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '90vh',
    backgroundImage: `url(${imgd})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  Tilte: {
    color: 'black',
    fontFamily: 'Nunito',
    fontSize: { lg: '3rem', md: '3rem', sm: '2rem', xs: '.9rem' },
    fontWeight: 'bold',
  },
  ColorText: {
    color: 'rgb(198, 123, 10)',
    fontSize: '1.8rem',
  },
}))
export default function Hero() {
  const { t } = useTranslation()
  const [checked, setchecked] = useState(false)
  const classes = useStyles()
  useEffect(() => {
    setchecked(true)
  }, [])
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Collapse
        in={checked}
        {...(checked ? { timeout: 3000 } : {})}
        collapseheight={50}
      >
        <h1 className={classes.Tilte}>
          {t('hero-top')}
          <br />
          <span className={classes.ColorText}>{t('hero-bot')}</span>
          <br />
        </h1>
      </Collapse>
    </div>
  )
}
