import React from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './Navbar'
import Home from './Home'
import Myaccount from './Myaccount'
import Useraccount from './Useraccount'
import Navbarnew from './Navbarnew'

function Main() {
  return (
      <Routes>
          <Route path='/' element={<>
          <Navbarnew/>
          <Home/>
        </>} />
        <Route path='/myaccount' element={<>
          <Navbarnew/>
          <Myaccount/>
        </>} />
        <Route path='/user/:id' element={
          <>
          <Navbarnew/>
          <Useraccount/>
          </>
        }/>
  
       </Routes>
      
    
  )
}

export default Main