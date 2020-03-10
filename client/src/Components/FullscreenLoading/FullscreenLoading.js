import React, {useEffect} from 'react'
import Loader from '../Loader/Loader'
import './FullscreenLoading.scss'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';


export default function FullscreenLoading(props){

  useEffect(() => {
    disableBodyScroll(document.querySelector('#root'))
    return function cleanup(){
      clearAllBodyScrollLocks()
    }
  }, [])

  return(
    <div className='fullLoader' style={{overflow: 'hidden',position: 'fixed', top: 0, left: 0, zIndex: 999, height: '100vh', width: '100vw', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{textAlign: 'center'}}>
        <Loader/>
        <p className='fullLoader__upperText'>We are processing your payment</p>
        <p className='fullLoader__lowerText'>Please wait...</p>
      </div>
    </div>
  )
}