import React from 'react'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import MuiDrawer from '../components/MuiDrawer'
import ProtectedRoute from './ProtectedRoute'

export default function Layout() {
  return (
    <>
      {/* <Navbar /> */}
      <ProtectedRoute>
        <MuiDrawer />
      </ProtectedRoute>

      {/* <Footer /> */}
    </>
  )
}
