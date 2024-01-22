import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './NavBar'

function ErrorPage() {
  return (
    <div>
    <Navbar/>
      <h1 className='error-page'>Oops! Something went wrong. Please click here to go to the home page: <Link to="/">Home</Link></h1>
    </div>
  )
}

export default ErrorPage
