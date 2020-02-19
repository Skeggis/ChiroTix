import React, { useEffect, useState, Fragment, useRef } from 'react'
import { URL } from '../../Constants'
import axios from 'axios'
import { useMedia } from 'react-use'


import BigAd from '../../Components/BigAd/BigAd'
import MainInfoBar from '../../Components/MainInfoBar/MainInfoBar'
import EventDescription from '../../Components/EventDescription/EventDescription'
import ShareButtons from '../../Components/ShareButtons/ShareButtons'
import {
    Skeleton,
    notification
} from 'antd'

import './EventPage.scss'

function EventPage(props) {

    const {
        setOrganization
    } = props

    const [event, setEvent] = useState({})
    const [loading, setLoading] = useState(true)
    const [mainInfoBarHeight, setMainInfoBarHeight] = useState(0)
    const [scrollHeight, setScrollHeight] = useState(0)

    const [url, setUrl] = useState(URL)
    useEffect(() => {
        window.scrollTo(0,0)
        let fetchEvent = async () => {
            let eventId = props.match.params.eventId
            setUrl(URL + `/event/${eventId}`)
            let result = await axios.get(process.env.REACT_APP_SERVER_URL + `/api/event/${eventId}`)
            console.log("HERE!:", result.data)
            if(!result.data.success){ return props.history.push('/notFound') }
            setEvent(result.data.eventInfo)
            setOrganization(result.data.eventInfo.organization)
            window.scrollTo(0,0)
            setLoading(false)
        }
        fetchEvent()

        window.addEventListener('scroll', () => setScrollHeight(window.scrollY));
        return () => window.removeEventListener('scroll', () => setScrollHeight(window.scrollY));
    }, [])

    function showErrors(messages, title) {
        if (!messages || messages.length === 0) { return }
        messages.forEach(message => {
            notification.error({
                message: message.title || title || "Error!",
                description: message.message,
                placement: 'bottomLeft'
            })
        })
    }

    const mainInfoRef = useRef(null)
    const headerRef = useRef(null)
    const [down, setDown] = useState(true)

    function handleScroll() {
        if (down) {
            setDown(false)
            scrollToRef(mainInfoRef)
        } else {
            setDown(true)
            scrollToRef(headerRef)
        }
    }

    useEffect(() => {
        if (scrollHeight > 500) {
            setDown(false)
        }

        if (scrollHeight < 200) {
            setDown(true)
        }
    }, [scrollHeight])

    let handleBuyTickets = () => {
        props.history.push('/tickets/' + props.match.params.eventId)
    }

    const scrollToRef = (ref) => window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' })



    return (
        <Fragment>
            <div className="EventPage" ref={headerRef}>

                <BigAd
                    image={event.image || '../../../tempImg.jpg'}
                    mainInfoBarHeight={mainInfoBarHeight}
                    title={event.name}
                    subTitle={`${event.city}, ${event.country}`}
                    loading={loading}
                    isSoldOut={event.isSoldOut}
                />

                <div ref={mainInfoRef} style={{ position: "sticky", top: 0 }}>

                    <MainInfoBar
                        setHeight={setMainInfoBarHeight}
                        priceRange={event.priceRange}
                        dates={event.dateRange}
                        handleBuyTickets={handleBuyTickets}
                        loading={loading}
                        handleScroll={handleScroll}
                        down={down}
                        isSelling={event.isSelling}
                        isSoldOut={event.isSoldOut}
                    />
                </div>


                <div className="EventPage__page" >
                    <EventDescription description={event.longDescription} speakers={event.speakers} tags={event.tags} loading={loading} />

                    {!loading && (
                        <div className="EventPage__shareButtons">
                            <ShareButtons url={url} />
                        </div>
                    )}


   
                </div>
            {loading ? (
                <div >
                            <Skeleton active />
                        </div>
                    ) : (
                        <div className="EventPage__gmaps">
                                <iframe title="massi" className="EventPage__iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1789.6759986433394!2d-21.90691108388139!3d64.11145742580317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48d60caaf8eb043d%3A0xf3846a65cb2f18b0!2sFannborg%202%2C%20K%C3%B3pavogur!5e1!3m2!1sen!2sis!4v1576517501262!5m2!1sen!2sis" ></iframe>
                            </div>
                        )}
                        </div>
        </Fragment>
    );
}

export default EventPage;