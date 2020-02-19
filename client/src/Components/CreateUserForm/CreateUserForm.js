import React from 'react';
import {
    Button,
    Card,
    Form,
    Input,
    Icon, 
    notification
} from 'antd';
import axios from 'axios'
import './CreateUserForm.scss';
import { withRouter } from 'react-router-dom'
import {getAccessToken} from '../Authentication/helpers'

const URL = process.env.REACT_APP_SERVER_URL

function CreateUserForm(props){

    const { getFieldDecorator } = props.form;

    const formItemLayout = {
        labelCol: {
            sm: { span: 5, offset: 1 },
        },
        wrapperCol: {
            sm: { span: 15 },
        },
    };

    let handleSubmit = e => {
        console.log("HERE!")
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
          if (!err) { 
            console.log(values)/**Send login request to server */
            postRequest(values.email, values.password, values.confirmPassword, values.name)  
             }
        });
      };

    
    let postRequest = async (email, password, confirmPassword, name) => {
    console.log("POST!")
        let post = {
            url: `${process.env.REACT_APP_SERVER_URL}/api/createUser`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                password,
                email,
                name,
                confirmPassword,
                accessToken: await getAccessToken() || "matur"
            }
        }

        let result = await axios(post)
        let data = result.data
        console.log(data)
        if(!data.success){return showErrors(data.messages, "Create User error!")}
        else { openNotificationWithIcon('success', 'Success', 'Successfully created the user') }
    }
    const openNotificationWithIcon = (type, title, message) => {
        notification[type]({
          message: title,
          description: message
        });
      };
    function showErrors(messages, title) {
        if(!messages || messages.length === 0){return}
        messages.forEach(message => {
            notification.error({
                message: message.title || title || "Error!",
                description: message.message,
                placement: 'bottomLeft'
            })
        })
    }
    //http://localhost:5000/login?socketId=${socketID}
    // var handleSubmit = () => {
    //     fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             email: email,
    //             password: password
    //         })
    //     })
    // }

    return (
        <div className="CreateUserForm">
            <Card title="Create User" className="CreateUserForm__card">
                <Form onSubmit={handleSubmit} id="CreateUserForm">
                    <Form.Item {...formItemLayout} style={{ marginBottom: 5 }} label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not a valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                }
                            ],
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} style={{ marginBottom: 5 }} label="Name">
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input the user's name!",
                                }
                            ],
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="Password" >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password!' }] 
                        })
                        (<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="Confirm password" >
                        {getFieldDecorator('confirmPassword', {
                            rules: [{ required: true, message: 'Please confirm the password!' }] 
                        })
                        (<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                    </Form.Item>

                    <div className="CreateUserForm__submitButtonDiv">
                        <Button htmlType='submit' className="CreateUserForm__submitButton">Submit</Button>
                    </div>

                </Form>
            </Card>
        </div>

    );
}
export default Form.create({ name: 'createUserForm' })(withRouter(CreateUserForm));