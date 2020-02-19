import React, { useEffect } from 'react'
import {
  Collapse
} from 'antd'

import './Collapse.scss'

export default function MyCollapse(props) {
  const {
    isOpen,
    children
  } = props

const [open, setOpen] = React.useState(false)

useEffect(() => {
  if(!isOpen){
    setTimeout(() => setOpen(false), 1100)
  } else {
    setOpen(isOpen)
  }
}, [isOpen])


  return (
    <div className='collapse'>
      <Collapse  bordered={false} activeKey={open ? '1' : ''} >
        <Collapse.Panel  key='1' showArrow={false}>
          {children}
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}