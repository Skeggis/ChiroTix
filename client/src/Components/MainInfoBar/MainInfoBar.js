import React, { useRef, useEffect, useState, Fragment } from 'react'
import { Typography, Row, Col, Button } from 'antd'
import ScrollDownButton from '../ScrollDownButton/ScrollDownButton'
import './MainInfoBar.scss'
import { useMedia } from 'react-use'

function MainInfoBar(props) {
    const {
        priceRange,
        dates,
        handleBuyTickets,
        setHeight,
        handleScroll,
        down,
        loading,
        isSelling=true,
        isSoldOut=true
    } = props

    const mobile = useMedia('(max-width: 900px)')


    const ref = useRef(null)


    useEffect(() => {
        setHeight(ref.current.clientHeight)
    })




    return mobile ? (
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} className='MainInfoBar MainInfoBar--sticky'>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap',  }}>

                {!loading && (
                    <Fragment>

                        <div className="MainInfoBar__colDiv" style={{ marginRight: 30, }}>

                            <div className="MainInfoBar__nameDiv">
                                <h2 style={{ fontSize: '24px' }}>
                                    Price
             </h2>
                            </div>
                            <div className="MainInfoBar__valueDiv">
                                <h3 style={{ fontSize: '20px' }}>
                                    {priceRange}
                                </h3>
                            </div>

                        </div>
                        <div className="MainInfoBar__colDiv" style={{ marginRight: 0 }}>
                            <div className="MainInfoBar__nameDiv">
                                <h2 style={{ fontSize: '24px' }}>
                                    Dates
         </h2>
                            </div>

                            <div className="MainInfoBar__valueDiv">
                                <h3 style={{ fontSize: '20px' }}>
                                    {dates}
                                </h3>
                            </div>

                        </div>

                    </Fragment>
                )}
            </div>

            <div className=' MainInfoBar__buttonDiv' style={{ justifyContent: 'center', width: '100%', }}>
                <Button onClick={handleBuyTickets} className="MainInfoBar__button"  >Tickets</Button>
            </div>



        </div>
    ) : (


            <div ref={ref} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} className='MainInfoBar MainInfoBar--sticky'>
                {/* <div style={{ display: 'flex', margin: '0 80px'}}> */}
                {/* <div style={{ display: 'flex',flexGrow: '1', justifyContent: 'flex-start', marginLeft: 50 }}> */}

                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'wrap', maxWidth: 1600 }}>

                    {!loading && (
                        <Fragment>

                            <div className="MainInfoBar__colDiv" style={{ marginRight: 30, }}>

                                <div className="MainInfoBar__nameDiv">
                                    <h2 style={{ fontSize: '24px' }}>
                                        Price
                             </h2>
                                </div>
                                <div className="MainInfoBar__valueDiv">
                                    <h3 style={{ fontSize: '20px' }}>
                                        {priceRange}
                                    </h3>
                                </div>

                            </div>
                            <div className="MainInfoBar__colDiv" style={{ marginRight: 0 }}>
                                <div className="MainInfoBar__nameDiv">
                                    <h2 style={{ fontSize: '24px' }}>
                                        Dates
                         </h2>
                                </div>

                                <div className="MainInfoBar__valueDiv">
                                    <h3 style={{ fontSize: '20px' }}>
                                        {dates}
                                    </h3>
                                </div>

                            </div>

                        </Fragment>
                    )}
                </div>
                <div style={{ marginRight: 0 }}>
                    <ScrollDownButton handleClick={handleScroll} down={down} />
                </div>

                {/* </div> */}

{isSelling && !isSoldOut ? <div className=' MainInfoBar__buttonDiv' style={{ justifyContent: 'flex-end', width: '100%' }}>
                    <Button onClick={handleBuyTickets} className="MainInfoBar__button mainInfoBar--mobile" >Tickets</Button>
                </div>:<div className=' MainInfoBar__buttonDiv' style={{ justifyContent: 'flex-end', width: '100%' }}></div>}
                
            </div>
        );
}

export default MainInfoBar