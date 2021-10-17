import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/NavBar'


function Home() {
  return (
    <>
    <Navbar/>
    <div>
      <h1>Home</h1>
      <Link to="/products">Profile</Link>
      <br />
      <Link to="/about">About</Link>
      <br />
      <Link to="/contact">Contact</Link>
    </div>
    </>
  )
}

export default Home
