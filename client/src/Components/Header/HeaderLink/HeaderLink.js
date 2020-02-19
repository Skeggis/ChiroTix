import React from 'react' 
import {Link} from 'react-router-dom'
import './HeaderLink.scss'

export default function HeaderLink(props){
  const {
    to,
    children
  } = props

  return (
    <Link to={to}>
      <p className='headerLink'>
      {children}
      </p>
    </Link>
  )
}