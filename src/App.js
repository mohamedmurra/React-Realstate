import * as React from 'react'
import Header from './componets/Header'
import Footer from './componets/Footer'
import { ColorModeProdvider } from './componets/Theme/index'
import { BrowserRouter as Router } from 'react-router-dom'
import Pathes from './pages/Route'
import { Paper } from '@mui/material'
import { GlobalAuthProvider } from './componets/UserContext/Provider'
import CustomeAlert from './pages/Login/CustomeAlert'
import Loadnig from './componets/Loading'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = process.env.REACT_APP_GOOGLE_ID

export default function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ColorModeProdvider>
        <GlobalAuthProvider>
          <Loadnig />
          <CustomeAlert />
          <Router>
            <Paper>
              <Header />
              <Pathes />
              <Footer />
            </Paper>
          </Router>
        </GlobalAuthProvider>
      </ColorModeProdvider>
    </GoogleOAuthProvider>
  )
}
