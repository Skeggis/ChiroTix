import React, { Fragment } from 'react'
import {
  Icon,
  Divider,
  Button
} from 'antd'
import './OrderDetails.scss'
import ShareButtons from '../ShareButtons/ShareButtons'

export default function OrderDetails(props) {
  const {
    orderDetails,
    tickets,
    chiroInfo
  } = props

  const receipt = orderDetails.receipt
  const lines = receipt.lines

  console.log('receipt', receipt)
  const order = {
    no: '23456526372',

  }

  return (
    <div className='orderDetails'>
      <div className='orderDetails__container'>
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" className='orderDetails__success' />
        <h1 style={{ fontWeight: 400 }}>We've received your order</h1>
        <h2 style={{ fontSize: 18, fontWeight: 400 }}>Order id: <span style={{ fontWeight: 500 }}>{order.no}</span></h2>

        <Divider />




        <div style={{ width: '100%', padding: '0 20px', }}>
          <h3>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>

            <table style={{ width: '80%' }}>
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th className='orderDetails__rightAlign'>Price</th>
                  <th className='orderDetails__rightAlign'>Amount</th>
                  <th className='orderDetails__rightAlign'>Total</th>
                </tr>
              </thead>
              <tbody>
                {lines.map(ticket => (
                  <Fragment>
                    {ticket.amount > 0 && (
                      <tr>
                        <td>{ticket.name}</td>
                        <td className='orderDetails__rightAlign'>{`${Number(ticket.price).toFixed(2)}$`}</td>
                        <td className='orderDetails__rightAlign'>{ticket.amount}</td>
                        <td className='orderDetails__rightAlign'>{`${Number(ticket.amount * ticket.price).toFixed(2)}$`}</td>
                      </tr>
                    )}
                  </Fragment>
                ))}

                {orderDetails.insurance && (
                  <Fragment>
                    <tr style={{ height: 10 }}></tr>
                    <tr style={{ borderTop: '1px dashed black' }}><td colSpan='4'></td></tr>
                    <tr style={{ height: 10 }}></tr>

                    <tr>
                      <th>Insurance</th>
                      <td className='paymentStep__rightAlign'>{Number(orderDetails.insurancePrice).toFixed(2)}$</td>
                      <td className='paymentStep__rightAlign'>1</td>
                      <td className='paymentStep__rightAlign'>{Number(orderDetails.insurancePrice).toFixed(2)}$</td>
                    </tr>
                  </Fragment>
                )}

                <tr style={{ height: 10 }}></tr>
                <tr >
                  <th className='orderDetails__rightAlign' colSpan='4'>{Number(receipt.amount).toFixed(2)}$</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Divider />
        <div style={{ width: '100%', padding: '0 20px' }}>
          <h3>Payment Information</h3>
          <div style={{ display: 'flex', width: '100%' }}>

            <div className='orderDetails__detailBlock'>
              <h4>Payment</h4>
              <p>Method: {receipt.paymentMethod}</p>
              <p>Amount: {Number(receipt.amount).toFixed(2)}$</p>
            </div>

            <div className='orderDetails__detailBlock'>
              <h4>Billing Address:</h4>
              <p>{receipt.name}</p>
              <p>{receipt.address}</p>
              <p>{receipt.place}</p>
              <p>{receipt.country}</p>
            </div>
          </div>
        </div>



        <div className='orderDetails__usInfo'>
          <p>{chiroInfo.companyName}</p>
          <p>{chiroInfo.location}</p>
          <p>{chiroInfo.place}</p>
          <p>{chiroInfo.kennitala}</p>
        </div>

      </div>

      <div className='orderDetails__infoContainer'>
        <ShareButtons />
        <div className='orderDetails__downloadButtonContainer'>
          <Button

          >
            Tickets
          </Button>
        </div>
      </div>

    </div>
  )
}