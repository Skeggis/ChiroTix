import React, { useEffect, useState, Fragment } from 'react'
import OrderDetails from '../../Components/OrderDetails/OrderDetails'
import axios from 'axios'
import { notification } from 'antd'
import Loader from '../../Components/Loader/Loader'

export default function ReceiptPage(props) {

  const [orderDetails, setOrderDetails] = useState({})
  const [chiroInfo, setChiroInfo] = useState({})
  const [loading, setLoading] = useState(true)

  const {
    match
  } = props

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/orders/${match.params.orderId}`)
      console.log(result)
      if (!result.data.success) {
        //TODO handle
        notification.error({
          message: 'Something went wrong',
          description: result.data.message,
          placement: 'bottomLeft'
        })
        console.log('her')
        return
      }
      console.log(result.data)
      setOrderDetails(result.data.orderDetails)
      setChiroInfo(result.data.chiroInfo[0])
      setLoading(false)
    }
    fetchData()
  }, [])

  console.log(chiroInfo)

  if (loading) {
    return (

      <div style={{height: '80vh'}}>
        <Loader />
      </div>
    )
  }
  return (
    <Fragment>
      <div style={{ marginTop: 30 }}>
        <OrderDetails orderDetails={orderDetails} chiroInfo={chiroInfo} tickets={orderDetails.lines}/>
      </div>
    </Fragment>
  )
}