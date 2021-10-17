import React from 'react'
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <Link to="/products">Profile</Link>
      <br />
      <Link to="/about">About</Link>
      <br />
      <Link to="/">Home</Link>
    </div>
  )
}

export default Contact;
