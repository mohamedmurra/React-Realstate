import React from 'react';
import {createRoot} from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "../node_modules/slick-carousel/slick/slick.css"; 
import "../node_modules/slick-carousel/slick/slick-theme.css";
import $ from 'jquery'


import './index.css';
import App from './App';
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


