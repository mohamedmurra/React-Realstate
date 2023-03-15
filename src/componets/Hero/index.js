import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import imgd from '../../assets/italiian.jpg'
import { Collapse, CssBaseline } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
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
    fontSize: { lg: '3rem', md: '3rem', sm: '2rem' },
  },
  ColorText: {
    color: 'rgb(198, 123, 10)',
    fontSize: '1.8rem',
  },
}))
export default function Hero() {
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
        {...(checked ? { timeout: 2000 } : {})}
        collapseheight={50}
      >
        <h1 className={classes.Tilte}>
          أعثر على منزل الأحلام <br />
          <span className={classes.ColorText}>عن طريقنا</span>
          <br />
        </h1>
      </Collapse>
    </div>
  )
}
