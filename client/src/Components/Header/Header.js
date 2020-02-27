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
         <img  className='header__logo' src={process.env.PUBLIC_URL + '/chirotix.PNG'} onClick={() => history.push('/')} />
      </div>
    )
  } else if (location === 'event') {
    return (
      <div className='header--eventPage'>
        <img className='header__logo' src={process.env.PUBLIC_URL + '/chirotix.PNG'} onClick={() => history.push('/')} />
        <h2 style={{ color: 'white', margin: 0, marginRight: 20, }}>{organization}</h2>

      </div>
    )
  } else if (location === 'tickets') {
    return (
      <div className='header--ticketsPage'>
        <img className='header__logo' src={process.env.PUBLIC_URL + '/chirotix.PNG'} onClick={() => history.push('/')} />
        {showTimer && (
          <h2 style={{ color: 'white', margin: 0, marginRight: 20, }}>{ticketTime}</h2>
        )}
      </div>
    )
  } else {
    console.log('her')
    return (
      <div className='header'>
        <img className='header__logo' src={process.env.PUBLIC_URL + '/chirotix.PNG'} onClick={() => history.push('/')} />
      </div>
    )
  }
}

export default withRouter(Header)