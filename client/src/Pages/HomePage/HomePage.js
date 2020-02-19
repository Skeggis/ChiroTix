import React, { Fragment, useState, useEffect } from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Events from '../../Components/Events/Events'
import { useMedia } from 'react-use'
import axios from 'axios'
import Loader from '../../Components/Loader/Loader'
import {
  Row,
  Col,
  Skeleton
} from 'antd'
import Header from '../../Components/Header/Header'
import Hero from '../../Components/Hero/Hero'


export default function HomePage(props) {
  const xs = useMedia('(min-width: 0px) and (max-width: 575px)')
  const sm = useMedia('(min-width: 576px) and (max-width: 767px)')
  const md = useMedia('(min-width: 768px) and (max-width: 991px)')
  const lg = useMedia('(min-width: 992px) and (max-width: 1199px)')
  const xl = useMedia('(min-width: 1200px) and (max-width: 1599px)')
  const xxl = useMedia('(min-width: 1600px)')
  const [eventRows, setEventRows] = useState([[]])
  const [size, setSize] = useState('')

  useEffect(() => {
    setEvents(events)
    if (xs) { setSize('xs') }
    if (sm) { setSize('sm') }
    if (md) { setSize('md') }
    if (lg) { setSize('lg') }
    if (xl) { setSize('xl') }
    if (xxl) { setSize('xxl') }
  }, [xs, sm, md, lg, xl, xxl])

  const [searchValues, setSearchValues] = useState({})
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    async function fetchData() {
      console.log(process.env.REACT_APP_SERVER_URL)
      const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/initialSearch`)
      console.log(result)
      setSearchValues(result.data.result)
      setEvents(result.data.result.featured)
      console.log(result.data.result.featured[0])
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <Fragment>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ margin: '50px 0 30px' }}>

            <Row justify='center' type='flex'>
              <Col xs={24} sm={18} md={12}>
                <Skeleton active />
              </Col>
            </Row>
          </div>

            <Row gutter={[24, 32]} style={{width: '100%'}}>
              {[...Array(6)].map((e, i) => (
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                  <div style={{ height: 300,padding: 10 }}>
                    <Skeleton active paragraph={{ rows: 6 }} />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div style={{ width: '100%' }}>

        <Hero
          searchValues={searchValues}
          setEvents={setEvents}
        />
          {/* <SearchBar
            searchValues={searchValues}
            setEvents={setEvents}
          /> */}
      
          <Events
            eventRows={eventRows}
            setEventRows={setEventRows}
            size={size}
            events={events}
            loading={loading}
          />
      

      </div>
    </Fragment>
  )
}