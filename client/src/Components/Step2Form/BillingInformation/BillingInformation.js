import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import './BillingInformation.scss'

import {
  Form,
  Input,
  Icon,
  Checkbox,
  Modal,
  Button
} from 'antd';

function BillingInformation(props) {

  const [confirmDirty, setConfirmDirty] = useState(false)
  const { getFieldDecorator } = props.form;
  const { buyerInfo, setBuyerInfo } = props


  const formItemLayout = {
    labelCol: {
      sm: { span: 5, offset: 1 },
    },
    wrapperCol: {
      sm: { span: 15 },
    },
  };


  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  let handleConfirmBlur = e => { setConfirmDirty(!!e.target.value) };

  let compareToEmail = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('email')) { callback('The emails that you entered are inconsistent!'); }
    else { callback(); }
  };

  let validateToConfirmEmail = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) { form.validateFields(['confirmEmail'], { force: true }); }
    callback();
  };

  let updateState = (e, field) => {
    let newBuyer = JSON.parse(JSON.stringify(buyerInfo))
    if (field === 'phone') { newBuyer[field] = e }
    else { newBuyer[field] = e.target.value }
    setBuyerInfo(newBuyer)
  }


  return (
    <div className="BillingInformation">
      <div className="BillingInformation__buyerInformationDiv">
        <div></div>
        <h2 className="BillingInformation__buyerInformation">Buyer Information</h2>
      </div>


      <Form.Item {...formItemLayout} style={{ marginBottom: 10 }} label="Full Name">
        {getFieldDecorator('name', {
          initialValue: buyerInfo.name,
          rules: [
            {
              required: true,
              message: 'Please input your name!',
              whitespace: true
            },
          ],
        })(<Input size='large' onChange={(e) => { updateState(e, 'name') }} />)}
      </Form.Item>

      <Form.Item {...formItemLayout} style={{ marginBottom: 10 }} label="E-mail">
        {getFieldDecorator('email', {
          initialValue: buyerInfo.email,
          rules: [
            {
              type: 'email',
              message: 'The input is not a valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
            {
              validator: validateToConfirmEmail,
            }
          ],
        })(<Input size='large' onChange={(e) => { updateState(e, 'email') }} />)}
      </Form.Item>

      <Form.Item {...formItemLayout} style={{ marginBottom: 10 }} label="Confirm Email" >
        {getFieldDecorator('confirmEmail', {
          initialValue: buyerInfo.confirmEmail,
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              validator: compareToEmail,
            },
          ],
        })(<Input size='large' onBlur={handleConfirmBlur} onChange={(e) => { updateState(e, 'confirmEmail') }} />)}
      </Form.Item>

      <Form.Item {...formItemLayout} style={{ marginBottom: 10 }} label="Phone Number">
        {getFieldDecorator('phone', {
          initialValue: buyerInfo.phone,
          rules: [{ required: true, message: 'Please input your phone number!' }],
        })(<PhoneInput
          size='large'
          country={'is'}
          value={props.form.getFieldValue('phone')}
          onChange={(e) => { updateState(e, 'phone') }}
        />)}
      </Form.Item>

      <Form.Item {...formItemLayout} style={{ marginBottom: 10 }} label="Address">
        {getFieldDecorator('address', {
          initialValue: buyerInfo.address,
          rules: [
            { type: 'string', required: true, message: 'Please input your address!' },
          ],
        })(<Input size='large' onChange={(e) => { updateState(e, 'address') }} />)}
      </Form.Item>

      <Form.Item {...formItemLayout} style={{ marginBottom: 10 }} label="City">
        {getFieldDecorator('city', {
          initialValue: buyerInfo.city,
          rules: [
            { type: 'string', required: true, message: 'Please input your city!' },
          ],
        })(<Input size='large' onChange={(e) => { updateState(e, 'city') }} />)}
      </Form.Item>

      <Form.Item {...formItemLayout} style={{ marginBottom: 10 }} label="State">
        {getFieldDecorator('state', {
          initialValue: buyerInfo.state,
          rules: [
            { type: 'string', required: true, message: 'Please input your state!' },
          ],
        })(<Input size='large' onChange={(e) => { updateState(e, 'state') }} />)}
      </Form.Item>

      <Form.Item {...formItemLayout} style={{ marginBottom: 10 }} label="Zip Code">
        {getFieldDecorator('zipCode', {
          initialValue: buyerInfo.zipCode,
          rules: [
            { type: 'string', required: true, message: 'Please input your zip code!' },
          ],
        })(<Input size='large' onChange={(e) => { updateState(e, 'zipCode') }} />)}
      </Form.Item>

     
    </div>

  );
}

export default BillingInformation;
