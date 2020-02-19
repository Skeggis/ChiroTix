import React, { useState, useEffect } from 'react'
import './EventItem.scss'
import {
  Divider,
  Button,
  Skeleton
} from 'antd'
import { Animated } from "react-animated-css";
import { withRouter } from 'react-router-dom';


function EventItem(props) {
  const {
    event,
    eventIsOpen,
    setEventIsOpen,
    selectedEvent,
    setSelectedEvent,
    eventRowNumber,
    setOldRowNumber,
    eventColNumber,
    setOldColNumber,
    setEventWasClosed,
    history
    //isHovering,
    //setIsHovering
  } = props

  const [isHovering, setIsHovering] = useState(false)


  function handleMouseEnter() {
    setIsHovering(true)
  }

  function handleTouch(event) {
    console.log('touch')
    setIsHovering(prev => {

      if (prev !== event.id) {
        return event.id
      } else {
        return -1
      }
    }
    )
  }

  function handleMouseLeave() {
    setIsHovering(false)
  }

  function handleEventClick(event) {
    console.log('click')
    setOldRowNumber(selectedEvent.eventRowNumber)
    setOldColNumber(selectedEvent.eventColNumber)

    if (selectedEvent.id === event.id) {
      if (eventIsOpen) {
        setSelectedEvent({ id: -1 })
        setEventWasClosed(false)
        setOldRowNumber(-1)
      } else {
        event.eventRowNumber = eventRowNumber
        event.eventColNumber = eventColNumber
        setSelectedEvent(event)
        setEventWasClosed(true)
      }
      console.log('her')
      setEventIsOpen(!eventIsOpen)
    } else {
      console.log('her2')
      setEventIsOpen(true)
      if (selectedEvent.id === -1) {

        setEventWasClosed(true)
      } else {
        setEventWasClosed(false)
      }
      event.eventRowNumber = eventRowNumber
      event.eventColNumber = eventColNumber
      setSelectedEvent(event)
    }

  }

  const [textDisplay, setTextDisplay] = useState('flex')
  const [buttonsDisplay, setButtonsDisplay] = useState('none')

  // useEffect(() => {
  //   if (isHovering) {
  //     setTimeout(() => {
  //       setTextDisplay('none')
  //     }, 300)

  //     setButtonsDisplay('flex')
  //   }
  // }, [isHovering])

  function handleClickMore(e) {
    history.push(`/event/${event.id}`)
    //e.preventDefault()
  }

  function handleClickTickets(e) {
    history.push(`/tickets/${event.id}`)
  }

  const selected = selectedEvent.id === event.id
  const cardHover = selected || isHovering ? 'eventItem-hovering' : ''
console.log(event.name, event.isSoldOut, event.isSelling)
  return (
    <div className={`eventItem ${cardHover}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
     // onTouch={handleTouch}
      // onTouchEnd={e => e.preventDefault()}
      onClick={() => handleEventClick(event)}
    >
      <div className='eventItem__imageContainer'>
        <img
          src={event.image}
          className={`eventItem__image ${(isHovering || selected) && 'eventItem__image-hovering'}`}
          alt={event.name}
        />
        <div className={`${cardHover ? 'overlay-hover' : 'overlay'}`}>

          <div style={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
            <div className='eventItem__imageContent' style={{ margin: '10px 10px 0 10px', display: 'flex', justifyContent: 'space-between', }}>
              <div style={{ display: 'flex', flexDirection: 'column', }}>
                <Animated animateOnMount={false} isVisible={isHovering || selected} animationIn='fadeInLeft' animationOut='fadeOutLeft' animationInDuration={300} animationOutDuration={300}>
                  <h3 style={{ margin: 0, fontSize: 20, color: 'white' }}>{event.city}</h3>
                </Animated>
                <Animated animateOnMount={false} isVisible={isHovering || selected} animationIn='fadeInLeft' animationOut='fadeOutLeft' animationInDelay={80} animationInDuration={300} animationOutDuration={300}>
                  <p style={{ padding: 0, fontSize: 16, color: 'white' }}>{event.country}</p>
                </Animated>
              </div>
              <div>
                <Animated animateOnMount={false} isVisible={isHovering || selected} animationIn='fadeInRight' animationOut='fadeOutRight' animationInDuration={300} animationOutDuration={300}>
                  <h3 style={{ color: 'white' }}>{event.organization}</h3>
                </Animated>
              </div>
            </div>
          </div>
        </div>

        <div className='eventItem__contentWrapper'>
          <div className='eventItem__secondContentWrapper'>
            <div className='eventItem__nameContentWrapper'>
              <div className='eventItem__soldOutWrapper' style={event.isSoldOut ? {}:{visibility:"hidden"}}>
                <h1 className='eventItem__soldOutTitle'>Sold Out</h1>
              </div>
              <Animated isVisible={!isHovering && !selected} animateOnMount={false} animationOut='fadeOutLeft' animationIn='fadeInLeft' animationInDuration={300} animationOutDuration={300} style={{width: '100%'}}>
                <div className='eventItem__nameContentSecondWrapper'>
                  <h1 className='eventItem__name'>{event.name}</h1>
                  <p className='eventItem__date'>{new Date(event.startDate).toDateString()}</p>
                </div>

              </Animated>
            </div>
            <div className='eventItem__buttonsContainer'>
              <Animated style={{ height: '100%' }} isVisible={isHovering || selected} animateOnMount={false} animationOut='fadeOutRight' animationIn='fadeInRight' animationInDuration={300} animationOutDuration={300}>
                <div className='eventItem__buttonsSecondContainer'>
                  <Button size='large' style={{ color: 'white', backgroundColor: 'rgba(157, 141, 241, 0.7)', }} onClick={() => handleClickMore()}>More</Button>
                  
                  {event.isSelling && !event.isSoldOut ? <Button size='large' style={{ color: 'white', backgroundColor: 'rgba(157, 141, 241, 0.7)', marginLeft: 30}} onClick={(event) => handleClickTickets(event)}>Tickets</Button>:""}
                </div>
              </Animated>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default withRouter(EventItem)