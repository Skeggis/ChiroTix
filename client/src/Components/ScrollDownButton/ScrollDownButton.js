import React, {useState} from 'react'
import './ScrollDownButton.scss'
export default function ScrollDownButton(props) {
  const {
    handleClick,
    down,
  } = props

  return (
    <div style={{ position: 'relative'}} className='scrollButton'>
      <a onClick={handleClick}><span className={down? 'scrollButton__down': 'scrollButton__up'}></span></a>
    </div>
  )
}