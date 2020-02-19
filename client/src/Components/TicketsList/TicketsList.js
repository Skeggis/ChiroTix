import React from 'react'
import { List, Col, Row, Button, Collapse } from 'antd'
import { useMedia } from 'react-use'
import './TicketsList.scss'

function TicketsList({ ticketTypes = [], location = '', organization = '', handleTicketChange = () => { }, totalTicketPrice = 0 }) {

    const mobile = useMedia('(max-width: 700px)')

    let theTicketTypes = []
    theTicketTypes.push(
        <List.Item style={{ margin: 0, padding: 0 }}>
            <Row className='TicketsList__listRow' gutter={0}>
                <Col span={1}></Col>
                <Col span={4}><h3 className="TicketsList__ticketInfoTitle">Event</h3></Col>
                <Col span={3}></Col>
                <Col span={3}><h3 className="TicketsList__ticketInfoTitle rightAlign">Organization</h3></Col>
                <Col span={2}></Col>
                <Col span={3}><h3 className="TicketsList__ticketInfoTitle rightAlign">Location</h3></Col>
                <Col span={1}></Col>
                <Col span={3}><h3 className="TicketsList__ticketInfoTitle rightAlign">Price</h3></Col>
                <Col span={2}></Col>
                <Col span={2}><h3 className="TicketsList__ticketInfoTitle" style={{ textAlign: "center" }}>Amount</h3></Col>

            </Row>
        </List.Item>)
    for (let i = 0; i < ticketTypes.length; i++) {
        let ticket = ticketTypes[i]
        theTicketTypes.push(
            <List.Item >
                <Row align='center' style={{ alignItems: 'center', display: 'flex' }} className='TicketsList__listRow'>
                    <Col span={1}></Col>
                    <Col span={4} className="TicketsList__ticketTypeInfo"> {ticket.name} </Col>
                    <Col span={3}></Col>
                    <Col span={3} className="TicketsList__ticketTypeInfo rightAlign"> {organization} </Col>
                    <Col span={2}></Col>
                    <Col span={3} className="TicketsList__ticketTypeInfo rightAlign"> {location} </Col>
                    <Col span={1}></Col>
                    <Col span={3} className="TicketsList__ticketTypeInfo rightAlign"> {parseFloat(ticket.price).toFixed(2)} $</Col>
                    <Col span={2}></Col>
                    <Col span={2} className="TicketsList__ticketTypeInfo">
                        {ticket.isSoldOut ? <div className="TicketsList__amountDiv">
                            <h1 className="TicketsList__soldOutTitle">Sold Out</h1>
                        </div>:<div className="TicketsList__amountDiv">
                            <Button shape="circle" onClick={() => handleTicketChange(ticket.id, false)} size="small">-</Button>
                            <h3 className="TicketsList__amount">{ticket.amount}</h3>
                            <Button shape="circle" onClick={() => handleTicketChange(ticket.id, true)} size="small">+</Button>
                        </div>}
                        
                    </Col>
                </Row>
            </List.Item>)
    }

    theTicketTypes.push(
        <List.Item style={{ marginTop: 10 }}>
            <Row className='TicketsList__listRow' align='center'>
                <Col span={1}></Col>
                <Col span={4}><h3 className="TicketsList__ticketInfoTitle">Total</h3></Col>
                <Col span={15}></Col>
                <Col span={4} push={1} ><h3 className="TicketsList__ticketInfoTitle" style={{ textAlign: "center" }}>{parseFloat(totalTicketPrice).toFixed(2)} $</h3></Col>
            </Row>
        </List.Item>)

    function createMobileButtons(ticket) {
        function handleMobile(event, addition) {
            event.stopPropagation()
            handleTicketChange(ticket.id, addition)
            console.log(event.preventDefault)
        }

        return (
            <div className="TicketsList__amountDiv">
                <Button shape="circle" onClick={(event) => handleMobile(event, false)} size="small">-</Button>
                <h3 className="TicketsList__amount">{ticket.amount}</h3>
                <Button shape="circle" onClick={(event) => handleMobile(event, true)} size="small">+</Button> 
            </div>
        )
    }

    if (!mobile) {

        return (
            <div className="TicketsList">
                <List >
                    {theTicketTypes}
                </List>
            </div>

        );
    } else {
        return (
            <div className='TicketsList--mobile'>
                <Collapse defaultActiveKey={['0']}>
                    {ticketTypes.map((ticket, i) => (
                        <Collapse.Panel header={ticket.name} key={`${i}`} extra={createMobileButtons(ticket)}>
                            <div className='TicketsList--mobile__container'>
                                <p className='TicketsList--mobile__label'>Price: <span className='TicketsList--mobile__item'>{parseFloat(ticket.price).toFixed(2)}$</span></p>
                                <p className='TicketsList--mobile__label'>Organization: <span className='TicketsList--mobile__item'>{organization}</span></p>
                                <p className='TicketsList--mobile__label'>Location: <span className='TicketsList--mobile__item'>{location}</span></p>
                            </div>
                        </Collapse.Panel>
                    ))}
                </Collapse>
                <div className='TicketsList--mobile__totalContainer'>
                    <h1 className='TicketsList--mobile__totalItem'>Total</h1>
                    <h1 className='TicketsList--mobile__totalItem'>{parseFloat(totalTicketPrice).toFixed(2)} $</h1>
                </div>
            </div >
        )
    }
}

export default TicketsList

