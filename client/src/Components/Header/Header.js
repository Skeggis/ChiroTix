import React, { useState, useEffect } from 'react'
import './Header.scss'
import { Link, withRouter } from 'react-router-dom'

function Header(props) {
  const {
    organization,
    ticketTime,
    showTimer,
    history
  } = props

  useEffect(() => {
    setLocation(history.location.pathname.split('/')[1])
  }, [history.location.pathname])

  const [location, setLocation] = useState(history.location.pathname.split('/')[1])

  if (location === '') {
    return (
      <div className='header--eventPage'>
        <Link to='/' >
          <h2 style={{ color: 'white', margin: 0, marginLeft: 20, }}>ChiroTix</h2>
        </Link>
      </div>
    )
  } else if (location === 'event') {
    return (
      <div className='header--eventPage'>
        <Link to='/' >
          <h2 style={{ color: 'white', margin: 0, marginLeft: 20, }}>ChiroTix</h2>
        </Link>
        <h2 style={{ color: 'white', margin: 0, marginRight: 20, }}>{organization}</h2>

      </div>
    )
  } else if (location === 'tickets') {
    return (
      <div className='header--ticketsPage'>
        <Link to='/'>
          <h2 style={{ color: 'white', margin: 0, marginLeft: 20 }}>ChiroTix</h2>
        </Link>
        {showTimer && (
          <h2 style={{ color: 'white', margin: 0, marginRight: 20, }}>{ticketTime}</h2>
        )}
      </div>
    )
  } else {
    console.log('her')
    return (
      <div className='header'>
        <Link to='/' >
          <h2 style={{ color: 'white', margin: 0, marginLeft: 20 }}>ChiroTix</h2>
        </Link>
      </div>
    )
  }
}

export default withRouter(Header)