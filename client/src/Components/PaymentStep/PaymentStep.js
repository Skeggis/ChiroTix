import React, { useState, Fragment } from 'react'
import PaymentForm from './PaymentForm/PaymentForm'
import './PaymentStep.scss'

import {
  Checkbox,
  Icon,
  Modal,
  Button
} from 'antd'

export default function PaymentStep(props) {
  const {
    ticketTypes,
    totalTicketPrice,
    buyTickets,
    insuranceSelected,
    setInsuranceSelected,
    submitCardLoading,
    insurancePercentage,
    paypalProcessingLoading,
    setPaypalProcessingLoading
  } = props


  const insurancePrice = Number((insurancePercentage * totalTicketPrice)).toFixed(2)
  const totalPrice = insuranceSelected ? Number(totalTicketPrice + Number(insurancePrice)).toFixed(2) : Number(totalTicketPrice).toFixed(2)






  return (
    <Fragment>
      <div className='paymentStep'>
        <div className='paymentStep__wrapper' style={{ width: '70%' }}>
          <h3>Order Summary</h3>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 20 }}>


            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th className='paymentStep__rightAlign'>Price</th>
                  <th className='paymentStep__rightAlign'>Amount</th>
                  <th className='paymentStep__rightAlign'>Total</th>
                </tr>
              </thead>
              <tbody>
                {ticketTypes.map(ticket => (
                  <Fragment>
                    {ticket.amount > 0 && (
                      <tr key={ticket.id}>
                        <td>{ticket.name}</td>
                        <td className='paymentStep__rightAlign'>{`${Number(ticket.price).toFixed(2)}$`}</td>
                        <td className='paymentStep__rightAlign'>{ticket.amount}</td>
                        <td className='paymentStep__rightAlign'>{`${Number(ticket.amount * ticket.price).toFixed(2)}$`}</td>
                      </tr>
                    )}
                  </Fragment>
                ))}

                <tr style={{ height: 10 }}></tr>
                <tr style={{ borderTop: '1px dashed black' }}><td colSpan='4'></td></tr>
                <tr style={{ height: 10 }}></tr>

                <tr>
                  <th>Insurance</th>
                  <td className='paymentStep__rightAlign'>{insurancePrice}$</td>
                  <td className='paymentStep__rightAlign'>{insuranceSelected ? '1' : '0'}</td>
                  <td className='paymentStep__rightAlign'>{insuranceSelected ? insurancePrice : '0.00'}$</td>
                </tr>

                <tr style={{ height: 10 }}></tr>


                <tr >
                  <th className='orderDetails__rightAlign' colSpan='4'>{totalPrice}$</th>
                </tr>
              </tbody>
            </table>


          </div>


          <div >
            <PaymentForm
              setInsuranceSelected={setInsuranceSelected}
              insuranceSelected={insuranceSelected}
              buyTickets={buyTickets}
              submitCardLoading={submitCardLoading}
              totalPrice={totalPrice}
              paypalProcessingLoading={paypalProcessingLoading}
              setPaypalProcessingLoading={setPaypalProcessingLoading}
            />
          </div>


        </div>
      </div>
    </Fragment>
  )
}