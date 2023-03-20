import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/slick-carousel/slick/slick.css'
import '../node_modules/slick-carousel/slick/slick-theme.css'
import $ from 'jquery'
import './i18n'

import './index.css'
import App from './App'
createRoot(document.getElementById('root')).render(
  <Suspense fallback='loading'>
    <App />
  </Suspense>
)
