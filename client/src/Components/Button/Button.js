import React from 'react'
import { Button as AntButton } from 'antd'
import './Button.scss'

export default function Button(props) {

  const {
    loading,
    onClick,
    type,
    size,
    children
  } = props

  if (type === 'link') {
    return (
      <div className='button--link'>
        <AntButton
          loading={loading}
          onClick={onClick}
          type={type}
          size={size}
        >
          {children}
        </AntButton>
      </div>
    )
  } else if(type === 'outlined'){
    return (
      <div className='button--outlined'>
        <AntButton
          loading={loading}
          onClick={onClick}
          type={type}
          size={size}
        >
          {children}
        </AntButton>
      </div>
    )
  } else {
    return (
      <div className='button'>
      <AntButton
        loading={loading}
        onClick={onClick}
        type={type}
        size={size}
      >
        {children}
      </AntButton>
    </div>
    )
  }
}