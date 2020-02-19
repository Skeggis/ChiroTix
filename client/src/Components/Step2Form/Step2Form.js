import React from 'react'

import { Form } from 'antd'

import BillingInformation from './BillingInformation/BillingInformation'
import TicketOwnersInformation from './TicketOwnersInformation/TicketOwnersInformation'

import './Step2Form.scss'

//props: ticketTypes=[{}], ownerInfo=[{label:"name", type:"input", required:true}]
function Step2Form(props) {
  const {
    openPanels, setOpenPanels,
    ticketsOwnersInfo, setTicketsOwnersInfo,
    buyerInfo, setBuyerInfo, stepsController
  } = props

  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) { stepsController(1) }
    });
  };
  
  return (
    <Form className="Step2Form" onSubmit={handleSubmit} id="billingInformationForm">
      <BillingInformation form={props.form} buyerInfo={buyerInfo} setBuyerInfo={setBuyerInfo} />
      <TicketOwnersInformation form={props.form}
        openPanels={openPanels} setOpenPanels={setOpenPanels} ticketsOwnersInfo={ticketsOwnersInfo} setTicketsOwnersInfo={setTicketsOwnersInfo} />
    </Form>
  );
}

export default Form.create({ name: 'billingInformation' })(Step2Form)