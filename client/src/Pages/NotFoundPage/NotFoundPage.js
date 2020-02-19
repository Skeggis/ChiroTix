import React, { Fragment } from 'react'
import { Button } from 'antd'
import './NotFoundPage.scss'
import {withRouter} from 'react-router-dom'

function NotFoundPage(props) {

  return (
    <Fragment>
    <div className='notFound'>
      <div className='notFound__content'>
        <div className='notFound__wrapper'>
          <div className='notFound__container'>
            <h1 className='notFound__404'>
              404
            </h1>
            <div className='notFound__text'>
              Page Not Found
            </div>
          </div>
          <div className='notFound__buttonContainer'>
          <Button className='notFound__buttton' onClick={() => props.history.push('/')}>Home</Button>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  )
}

export default withRouter(NotFoundPage)