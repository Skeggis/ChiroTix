import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Button, Icon, Modal, notification, Skeleton } from 'antd'
import axios from 'axios'

import io from 'socket.io-client';

import TicketsImage from '../../Components/TicketsImage/TicketsImage'
import TicketsSteps from '../../Components/TicketsSteps/TicketsSteps'

import TicketsList from '../../Components/TicketsList/TicketsList'


import Step2Form from '../../Components/Step2Form/Step2Form'
import OrderDetails from '../../Components/OrderDetails/OrderDetails'
import PaymentStep from '../../Components/PaymentStep/PaymentStep'
import './TicketsPage.scss'


const URL = process.env.REACT_APP_SERVER_URL

let stepsInfo = [{
    title: "Tickets"
}, {
    title: "Billing Information"
}, { title: "Payment" }, {
    title: "Receipt"
}
]
let defaultImage = '../../../tempDefaultImg.jpg'
function TicketsPage(props) {
    const {
        setTime,
        setShowTimer
    } = props


    const [loading, setLoading] = useState(true)
    const [reserveLoading, setReserveLoading] = useState(true)
    const [releaseLoading, setReleaseLoading] = useState(false)
    const [submitCardLoading, setSubmitCardLoading] = useState(false)

    //position of the steps
    const [current, setCurrent] = useState(0);
    const [buyerId, setBuyerId] = useState(undefined)

    const [timer, setTimer] = useState(0)
    const [releaseTime, setReleaseTime] = useState(undefined)
    const [eventInfo, setEventInfo] = useState({})

    //Array of objects of the types of tickets for this event and with key "amount" representing how many of each type the buyer wants
    /**
     * ticketTypes: [{
     *      id:Integer,
     *      name: String,
     *      price: double,
     *      amount: Integer
     * }]
     */
    const [ticketTypes, setTicketTypes] = useState([]);
    //Total price of the tickets
    const [totalTicketPrice, setTotalTicketPrice] = useState(0)


    //Array of integer-keys representing which panel of tickets is open (in step 2)
    const [openPanels, setOpenPanels] = useState([1])
    const [buyerInfo, setBuyerInfo] = useState({})

    const [orderDetails, setOrderDetails] = useState({})
    const [chiroInfo, setChiroInfo] = useState({})
    const [insuranceSelected, setInsuranceSelected] = useState(false)
    const [insurancePercentage, setInsurancePercentage] = useState(null)

    const [paypalProcessingLoading, setPaypalProcessingLoading] = useState(false)

    /**
     * ticketsOwnersInfo: [{
     *          id: Integer, (the id of the ticketType),
     *          name: String, (name of the ticketType),
     *          price: double, 
     *          header: String, (is set in TOI.js and represents the header-title of its panel)
     *          extra: boolean or string, (is set in TOI.js and represents wether the panel is to show an icon on the right side (if "empty" then no icon. If true then a success icon, and error icon if false))
     *          ownerInfo: [{
     *              label: string, (the label-string for the input for this info)
                    value: string, (the value in the input for this info)
                    type: string, (the type of input, "checkbox" etc.)
                    required: boolean, (wether it is required of the user to fill in this info)
                    beenTouched: boolean (set in TOI.js and represents wether the input has been in focus in the past, if true the user has clicked it sometime in the past)
     *          }]
     * }]
     */
    const [ticketsOwnersInfo, setTicketsOwnersInfo] = useState([])
    const ref = useRef({}) //For socket.

    useEffect(() => {
        setTimeout(() => {
            if (!releaseTime) { return setTime('') }
            let now = new Date()
            if (new Date(releaseTime) - now < 0) { return setReleaseTime(undefined) }

            let currentTimer = new Date(releaseTime) - now
            setTimer(currentTimer)
            let time = "00:00"
            if (currentTimer !== 0) {
                let minutes = parseInt(currentTimer / 60000)
                let seconds = parseInt((currentTimer % 60000) / 1000)
                if (minutes < 10) { time = `0${minutes}:` }
                else { time = minutes + ":" }
                if (seconds < 10) { time += `0${seconds}` }
                else { time += seconds }
            }
            setTime(time)
        }, 1000)
    }, [timer, releaseTime])

    useEffect(() => {
        window.scrollTo(0, 0)
        let theSocket = null
        async function fetchData() {
            let eventId = props.match.params.eventId
            let result = await axios.get(URL + `/api/tickets/info/${eventId}`)
            let data = result.data
            let event = data.event

            if (!data.success) { return showErrors(data.messages) }

            event.ticketTypes.sort((a, b) => { return a.id > b.id ? 1 : (a.id < b.id) ? -1 : 0 })
            setEventInfo(event.eventInfo)
            setBuyerId(data.buyerId)
            setTicketTypes(event.ticketTypes)
            setInsurancePercentage(data.insurancePercentage)

            ref.current.socket = io.connect(URL, { query: { buyerId: data.buyerId, eventId: eventId } })
            ref.current.socket.on('connect', () => { console.log("COONNNEST!") })

            ref.current.socket.on('timerDone', () => { showTimerDoneModal() })

            ref.current.socket.on('paymentProcessed', (data) => showReceipt(data))
            setLoading(false)
            setReserveLoading(false)
            theSocket = ref.current.socket
        }
        fetchData()

        return () => { if(theSocket){theSocket.disconnect(true)} }
    }, [props.match.params.eventId])

    let showReceipt = (data) => {
        console.log('PAYMENT PROCESSED EMIT')
        if(data.success){
            console.log('EMITDATA, ',data)
            setLoading(false)
            setReleaseLoading(false)
            setPaypalProcessingLoading(false)
            setOrderDetails(data.orderDetails)
            setCurrent(current => current+=1)
        } else {
            //TODO
            console.log('handle this')
        }
    }

    //Handle when buyer presses the plus (addTicket=true) or minus (addTickets=false) buttons
    let handleTicketChange = (ticketId, addTicket) => {
        let newTicketTypes = JSON.parse(JSON.stringify(ticketTypes))
        for (let i = 0; i < newTicketTypes.length; i++) {
            if (newTicketTypes[i].id === ticketId) {
                if (addTicket) {//Increment the amount of tickets for this type
                    newTicketTypes[i].amount++
                    setTotalTicketPrice(totalTicketPrice + parseFloat(newTicketTypes[i].price))
                    break
                } else if (newTicketTypes[i].amount > 0) {//decrement the amount of tickets for this type
                    newTicketTypes[i].amount--
                    setTotalTicketPrice(totalTicketPrice - parseFloat(newTicketTypes[i].price))
                    if (ticketsOwnersInfo.length > 0) { //If the buyer has been to the billingInformation page then we want to delete from ticketsOwnersInfo
                        ticketsOwnersInfo.reverse() //reverse to delete the "last" ticket that fits this types id
                        let ticketToDelete = ticketsOwnersInfo.find(ticket => ticket.id === ticketId)
                        let index = ticketsOwnersInfo.indexOf(ticketToDelete)
                        if (index >= 0) { ticketsOwnersInfo.splice(index, 1) }
                        ticketsOwnersInfo.reverse()
                        setTicketsOwnersInfo(ticketsOwnersInfo)
                        break
                    }
                }
            }
        }
        setTicketTypes(newTicketTypes)
    }

    let reserveTickets = async () => {
        // if(ticketTypes.length === 0){return}
        setReserveLoading(true)
        let post = {
            url: URL + '/api/tickets/reserveTickets',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                buyerId: buyerId,
                eventId: eventInfo.id,
                ticketTypes: ticketTypes,
                socketId: ref.current.socket.id
            }
        }

        let result = await axios(post)
        let data = result.data
        let { reservedTickets } = data
        setReserveLoading(false)

        if (!data.success) { return showErrors(data.messages, 'Error reserving tickets') }
        ref.current.socket.emit('timer')
        setReleaseTime(data.releaseTime)

        let newTicketsOwnersInfo = []
        let oldTicketsOwnersInfo = JSON.parse(JSON.stringify(ticketsOwnersInfo))
        for (let i = 0; i < reservedTickets.length; i++) {
            let reservedTicket = reservedTickets[i]
            let ownerInfoForThisTicket = JSON.parse(JSON.stringify(reservedTicket.ownerInfo))
            for (let j = 0; j < oldTicketsOwnersInfo.length; j++) {
                let oldTicket = oldTicketsOwnersInfo[j]
                if (oldTicket.ticketTypeId === reservedTicket.ticketTypeId && !oldTicket.used) {//If there is a ticket of this kind already (perhaps with data)
                    oldTicket.used = true
                    ownerInfoForThisTicket = oldTicket.ownerInfo
                    break;
                }
            }
            newTicketsOwnersInfo.push({
                id: reservedTicket.id,
                ticketTypeId: reservedTicket.ticketTypeId,
                name: reservedTicket.name,
                price: reservedTicket.price,
                extra: "empty",
                ownerInfo: ownerInfoForThisTicket
            })
        }
        setTicketsOwnersInfo(newTicketsOwnersInfo)
        stepsController(1)
    }

    let releaseTickets = async () => {
        console.log("RELEASE ME!")
        setReleaseLoading(true)
        // if(ticketTypes.length === 0){return}
        let post = {
            url: URL + '/api/tickets/releaseTickets',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                buyerId: buyerId,
                eventId: eventInfo.id,
                tickets: ticketsOwnersInfo,
                socketId: ref.current.socket.id
            }
        }

        let result = await axios(post)
        let data = result.data

        if (!data.success) { return showErrors(data.messages, 'Error!') /** TODO: Handle error message from server */ }

        setReleaseTime(undefined)
        stepsController(-1)
        setTimer(0)
        setReleaseLoading(false)
    }

    let handleBillingInformationSubmit = () => {
        let list = JSON.parse(JSON.stringify(ticketsOwnersInfo))
        let open = []
        for (let i = 0; i < list.length; i++) {
            list[i].extra = true //if true then the icon for this panel will be shown (success vs error vs empty)
            for (let j = 0; j < list[i].ownerInfo.length; j++) { list[i].extra = !!list[i].ownerInfo[j].value /**Extra is true iff value is non-empty*/ }
            if (!list[i].extra) { open.push(i + 1) }
        }
        setOpenPanels(open)
        setTicketsOwnersInfo(list)
    }

    /**
     * paymentOptions: {
     *      method: String ('borgun' || 'paypal')
     *      insuranceVerified: Boolean (only if method is borgun)
     *      Token: String (only if method is borgun)
     *      orderId: String (only if method is paypal)
     * }
     * 
     */
    let buyTickets = async (paymentOptions) => {
        setSubmitCardLoading(true)
        console.log("BUYINGTICKETS!")
        let post = {
            url: URL + '/api/tickets/buyTickets',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                buyerId: buyerId,
                eventId: eventInfo.id,
                tickets: ticketsOwnersInfo,
                buyerInfo,
                paymentOptions,
                insurance: paymentOptions.insuranceVerified ? paymentOptions.insuranceVerified : insuranceSelected,
                ticketTypes,
                socketId: ref.current.socket.id
            }
        }

        let result = await axios(post)
        let data = result.data

        console.log("DATA:", data)
        if (!data.success){
            showErrors(data.messages, 'Error buying tickets')
            setPaypalProcessingLoading(false)
            setLoading(false)
            setSubmitCardLoading(false)
        } else {
            //Do nothing if successful?
        }
      //  setSubmitCardLoading()
        // if (!data.success) {
        //     showErrors(data.messages, 'Error buying tickets')
        //     return;
        // }
        // setOrderDetails(data.orderDetails)
        // setChiroInfo(data.chiroInfo[0])
        // stepsController(1)

    }

    let stepsController = (direction) => {
        setCurrent(current + direction)
        if (current + direction >= 3) { setReleaseTime(undefined) }
    }

    let showTimerDoneModal = () => {
        Modal.error({
            title: "You took too long",
            content: "The tickets you reserved have been unreserved so you have to start over again if you want to buy a ticket",
            onOk: () => { setCurrent(0) },
            centered: true,
            zIndex: 1000000
        });
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

    setShowTimer(!!releaseTime && current !== 3 && current !== 0)




    let continueButton = "";
    if (current === 1) {
        continueButton = (
            <div className="TicketsPage__buttonDiv">
                <Button htmlType="submit" form="billingInformationForm" className="TicketsPage__button" onClick={handleBillingInformationSubmit}>
                    Buy tickets
                        <Icon type="arrow-right" />
                </Button>
            </div>
        );
    } else if (current === 0) {
        continueButton = (<div className="TicketsPage__buttonDiv">
            <Button loading={loading || reserveLoading} onClick={() => reserveTickets()} className="TicketsPage__button" style={{ marginRight: (reserveLoading || loading) ? 10 : 0 }}>
                Find tickets
                    <Icon type="arrow-right" />
            </Button>
        </div>);
    }


    let backButton = <div></div>;
    if (current === 1) {
        backButton = (<div className="TicketsPage__buttonDiv">
            <Button onClick={releaseTickets} className="TicketsPage__button" loading={releaseLoading} style={{}}>
                <span style={{ marginRight: 5 }}>
                    <Icon type="arrow-left" />
                </span>
                Back
            </Button>
        </div>);
    } else if (current === 2) {
        backButton = (<div className="TicketsPage__buttonDiv">
            <Button loading={submitCardLoading} onClick={() => stepsController(-1)} className="TicketsPage__button">
                <span style={{ marginRight: 5 }}>
                    <Icon type="arrow-left" />
                </span>
                Back
        </Button>
        </div>);
    }



    let componentToShow;
    if (current === 0) {
        componentToShow = <TicketsList ticketTypes={ticketTypes} organization={eventInfo.organization}
            location={`${eventInfo.city}, ${eventInfo.country}`} handleTicketChange={handleTicketChange} totalTicketPrice={totalTicketPrice} />
    } else if (current === 1) {
        console.log("SHOWME!")
        componentToShow = <div className="TicketsPage__billingInfo">
            <Step2Form
                openPanels={openPanels} setOpenPanels={setOpenPanels}
                ticketsOwnersInfo={ticketsOwnersInfo} setTicketsOwnersInfo={setTicketsOwnersInfo}
                buyerInfo={buyerInfo} setBuyerInfo={setBuyerInfo} stepsController={stepsController} current={current} />
        </div>
    } else if (current === 2) {
        componentToShow =
            <PaymentStep
                ticketTypes={ticketTypes}
                totalTicketPrice={totalTicketPrice}
                buyTickets={buyTickets}
                insuranceSelected={insuranceSelected}
                setInsuranceSelected={setInsuranceSelected}
                submitCardLoading={submitCardLoading}
                insurancePercentage={insurancePercentage}
                paypalProcessingLoading={paypalProcessingLoading}
                setPaypalProcessingLoading={setPaypalProcessingLoading}
            />
    } else if (current === 3) {
        let pdfHref = `${process.env.REACT_APP_SERVER_URL}/api/tickets/downloadMyTickets/${orderDetails.orderId}`
        componentToShow = <OrderDetails orderDetails={orderDetails} chiroInfo={chiroInfo} tickets={ticketTypes} pdfHref={pdfHref}/>
        ref.current.socket.disconnect(true)
    }

    return (
        <Fragment>
            <div className="TicketsPage">

                <TicketsImage
                    imageUrl={defaultImage}
                    title={eventInfo.name}
                    subTitle={eventInfo.dateRange}
                    loading={loading}
                />
                <div className="TicketsPage__page">
                    <div className="TicketsPage__ticketsSteps">
                        <TicketsSteps current={current} stepsInfo={stepsInfo} />
                    </div>
                    {loading ? (
                        <Skeleton active />
                    ) : (
                            <div >
                                {componentToShow}
                            </div>
                        )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                        {backButton}
                        {continueButton}
                    </div>


                </div>
            </div>
        </Fragment>
    );
}

export default TicketsPage