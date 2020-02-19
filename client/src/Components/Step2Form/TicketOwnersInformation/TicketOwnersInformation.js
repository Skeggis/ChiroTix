import React, { useEffect } from 'react'

import { Form, Collapse, Icon, Input } from 'antd'

import './TicketOwnersInformation.scss'

const genExtra = (success) => {
    if (success === "empty") { return }
    if (success) { return (<Icon type="check-circle" style={{ color: "green" }} onClick={event => { event.stopPropagation(); }} />); }
    else { return (<Icon type="warning" style={{ color: "red" }} onClick={event => { event.stopPropagation(); }} />)
    }
}

function TicketOwnersInformation(props) {

    const { getFieldDecorator } = props.form
    const { openPanels, setOpenPanels, setTicketsOwnersInfo, ticketsOwnersInfo } = props

    const formItemLayout = {
        labelCol: {
            sm: { span: 3 },
        },
        wrapperCol: {
            sm: { span: 15 },
        },
    };

    useEffect(() => {
        let copy = JSON.parse(JSON.stringify(ticketsOwnersInfo))
        copy.sort((a,b) => { return a.id > b.id ? 1: (a.id < b.id) ? -1:0 })
        for (let i = 0; i < copy.length; i++) {
            let ticket = copy[i]
            ticket.header = `ticket ${i + 1} - ${ticket.name}`
            for (let k = 0; k < ticket.ownerInfo.length; k++) { ticket.ownerInfo[k].beenTouched = false }
        }
        setTicketsOwnersInfo(copy)
    }, [])


    let validateOwnerInfo = (nr, infoNr, e) => {
        let list = JSON.parse(JSON.stringify(ticketsOwnersInfo))
        list[nr].ownerInfo[infoNr].value = e.target.value
        list[nr].ownerInfo[infoNr].beenTouched = true

        let allTouched = true
        for (let i = 0; i < list[nr].ownerInfo.length; i++) { if (!list[nr].ownerInfo[i].beenTouched) { allTouched = false; break; } }

        //If every input for this owner has not been interacted with then we don't want to show the icon for this panel
        if (!allTouched) { return setTicketsOwnersInfo(list) }

        list[nr].extra = true
        for (let i = 0; i < list[nr].ownerInfo.length; i++) {
            let info = list[nr].ownerInfo[i]
            if(!info.value){ list[nr].extra = false; break; }
        }

        setTicketsOwnersInfo(list)
    }

    let openThis = (panelsOpen) => { setOpenPanels(panelsOpen) }

    let ticketsOwnerInfoHTML = []
    ticketsOwnerInfoHTML.push(
        <div >
            <h2>Attendees' Information</h2>
        </div>
    )
    let ticketsList = []
    for (let i = 0; i < ticketsOwnersInfo.length; i++) {
        let ticketState = ticketsOwnersInfo[i]
        let ticketInfo = []

        if (!ticketState.ownerInfo) { continue }

        for (let j = 0; j < ticketState.ownerInfo.length; j++) {
            let info = ticketState.ownerInfo[j]
            console.log(`tickets[${i}].ownerInfo[${j}].${info.label}`)
            ticketInfo.push(
                <Form.Item {...formItemLayout} label={info.label} style={{ marginBottom: ticketState.ownerInfo.length === j ? 0: 10 }} >
                    {getFieldDecorator(`tickets[${i}].ownerInfo[${j}].${info.label}`, {
                        initialValue: info.value,
                        rules: [
                            {
                                required: info.required,
                                message: `Please input the ${info.label}!`,
                            }

                        ],
                    })(<Input size='large' onChange={(e) => { validateOwnerInfo(i, j, e) }} />)}
                </Form.Item>
            )
        }

        ticketsList.push(
            <Collapse.Panel header={ticketState.header} key={i + 1} extra={genExtra(ticketState.extra)} >
                {ticketInfo}
            </Collapse.Panel>
        )
    }


    ticketsOwnerInfoHTML.push(<div className='TicketsOwnersInformation__collapse'>
        <Collapse activeKey={openPanels} onChange={openThis}>
            {ticketsList}
        </Collapse>
    </div>)
    
    return (
        <div className='TicketsOwnersInformation'>
            {ticketsOwnerInfoHTML}
        </div>
    );
}

export default TicketOwnersInformation;