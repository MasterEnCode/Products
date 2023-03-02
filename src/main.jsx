import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider
} from 'react-router-dom'
import Router from './routes/Router'
import './index.css'
import SiteProvider from './context/SiteProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SiteProvider>
    <RouterProvider router={Router} />
  </SiteProvider>
)
