import React, {useEffect} from 'react'
import Loader from '../Loader/Loader'

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';


export default function FullscreenLoading(props){

  useEffect(() => {
    disableBodyScroll(document.querySelector('#root'))
    return function cleanup(){
      clearAllBodyScrollLocks()
    }
  }, [])

  return(
    <div style={{overflow: 'hidden',position: 'fixed', top: 0, left: 0, zIndex: 999, height: '100vh', width: '100vw', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Loader/>
    </div>
  )
}