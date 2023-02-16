import React from 'react'
import HomePage from './HomePage'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PropertyDetail from './PropertDetail'
import Blog from './Blog'
import BlogDetailPage from './BlogDetailPage'
import AgentDetail from './Agent-detail'
import Agents from './AgentLayout'
import Layout from '../componets/Layout'
import About from './AboutPage'
import Contact from './Contact'
import Dashbord from './Dashbord'
import PrivateRoute from './PrivateRoute'
import Unuthorize from './Unuthorize'
import Mapp from './Mapp'
import Faver from './Faver'
import Error404 from './Unuthorize/404'
import Activate from './Login/Activate'
import GoogleLAy from './Login/GoogleLAy'
import ResetPass from './Login/ResetPass'
import ResetPasswordConfirm from './Login/ResetPasswordConfirm'

const Pathes = () => {
  const Lucation = useLocation()
  return (
    <AnimatePresence>
      <Routes location={Lucation} key={Lucation.pathname}>
        <Route path='/' element={<HomePage />} title='HomePage' />
        <Route path='blog' element={<Blog />} title='Blog' />
        <Route path='main' element={<Layout />} title='Main' />
        <Route path='Agents' element={<Agents />} title='Agents' />
        <Route path='activate' element={<Activate />} title='activate' />
        <Route
          path='passwordReset'
          element={<ResetPass />}
          title='passwordReset'
        />
        <Route
          path='passwordResetConfirm'
          element={<ResetPasswordConfirm />}
          title='passwordResetConfirm'
        />
        <Route path='google' element={<GoogleLAy />} title='google' />
        <Route
          path='detail/:propertyID'
          element={<PropertyDetail title='Property Detail' />}
        />
        <Route
          path='blog-detail/:blogID'
          element={<BlogDetailPage title='Blog Detail' />}
        />
        <Route
          path='agent-detail/:agentId'
          element={<AgentDetail title='Agent Detail' />}
        />
        <Route path='about-us' element={<About />} title='About-Us' />
        <Route path='contact' element={<Contact />} title='Contact' />

        <Route path='Mapp' element={<Mapp />} title='Mapp' />

        <Route element={<PrivateRoute />}>
          <Route path='/faver' element={<Faver />} />
          <Route path='/admin-panel/*' element={<Dashbord />} title='Dashbord' />
        </Route>
        <Route path='Unuthorize' element={<Unuthorize />} title='Unuthorize' />
        <Route path='*' element={<Error404 />} title='404' />
      </Routes>
    </AnimatePresence>
  )
}

export default Pathes
