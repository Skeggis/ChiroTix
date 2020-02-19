import React from 'react'
import './Hero.scss'
import SearchBar from '../SearchBar/SearchBar'

export default function Hero(props) {
  const {
    searchValues,
    setEvents
  } = props

  return (
    <div className='hero' style={{ backgroundImage: `url('../../../test.jpg')` }}>
      <SearchBar searchValues={searchValues} setEvents={setEvents}/>
    </div>
  )
}