import React from 'react'
import './Hero.scss'
import SearchBar from '../SearchBar/SearchBar'

export default function Hero(props) {
  const {
    searchValues,
    setEvents,
    loading
  } = props

  return (
    <div className='hero' style={{ backgroundImage: `url('../../../lecture.jpg')`, backgroundPosition: 'top center', width: '100%' }}>
      <SearchBar 
        searchValues={searchValues} 
        setEvents={setEvents} 
        loading={loading}
      />
    </div>
  )
}