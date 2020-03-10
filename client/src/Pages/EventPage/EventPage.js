import React, { useEffect, useState, Fragment, useRef } from 'react'
import { URL } from '../../Constants'
import axios from 'axios'
import { useMedia } from 'react-use'
import mapboxgl from 'mapbox-gl'

import BigAd from '../../Components/BigAd/BigAd'
import MainInfoBar from '../../Components/MainInfoBar/MainInfoBar'
import EventDescription from '../../Components/EventDescription/EventDescription'
import ShareButtons from '../../Components/ShareButtons/ShareButtons'
import {
    Skeleton,
    notification
} from 'antd'

import './EventPage.scss'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

function EventPage(props) {

    const {
        setOrganization
    } = props

    const [event, setEvent] = useState({})
    const [loading, setLoading] = useState(true)
    const [mainInfoBarHeight, setMainInfoBarHeight] = useState(0)
    const [scrollHeight, setScrollHeight] = useState(0)
    const [mapState, setMapState] = useState({})
    const mapRef = React.useRef();


    const [url, setUrl] = useState(URL)
    useEffect(() => {
        window.scrollTo(0, 0)
        let fetchEvent = async () => {
            let eventId = props.match.params.eventId
            setUrl(URL + `/event/${eventId}`)
            let result = await axios.get(process.env.REACT_APP_SERVER_URL + `/api/event/${eventId}`)
            console.log("HERE!:", result.data)
            if (!result.data.success) { return props.history.push('/notFound') }
            setEvent(result.data.eventInfo)
            setOrganization(result.data.eventInfo.organization)
            window.scrollTo(0, 0)
            setLoading(false)
            initializeMap(result.data.eventInfo)
        }
        fetchEvent()




        window.addEventListener('scroll', () => setScrollHeight(window.scrollY));
        return () => window.removeEventListener('scroll', () => setScrollHeight(window.scrollY));
    }, [])

    function initializeMap(info) {
        const lat = parseFloat(info.latitude)
        const lng = parseFloat(info.longitude)
        setMapState({
            lng,
            lat,
            zoom: 2
        })

        const map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/huldarsson/ck7l4phna02r61ijy1aa5ryke',
            center: [lat, lng],
            zoom: 13,
        });

        var el = document.createElement('div');
        el.className = 'EventPage__marker';
        // el.style.backgroundImage = "/marker.png"
        const marker = new mapboxgl.Marker(el)
            .setLngLat([lat,lng])
            .addTo(map);
    }

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

                <div className="EventPage__gmaps">
                    <div>
                        <div ref={mapRef} className='EventPage__mapBoxContainer' />
                    </div>

                </div>
            </div>
        </Fragment>
    );
}

export default EventPage;