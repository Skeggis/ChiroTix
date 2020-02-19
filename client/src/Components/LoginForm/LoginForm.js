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
import './LoginForm.scss';
import { withRouter } from 'react-router-dom'

function LoginForm(props){

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
            postRequest(values.email, values.password)  
            console.log(values)/**Send login request to server */ }
        });
      };

    
    let postRequest = async (email, password) => {
        let post = {
            url: `${process.env.REACT_APP_SERVER_URL}/api/login`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                password,
                email
            }
        }

        let result = await axios(post)
        let data = result.data

        if(!data.success || !data.accessToken){return showErrors(data.messages, "Login error!")}
        else { 
            window.localStorage.setItem('access_token', data.accessToken) 
            props.history.push('/insert')
        }
    }

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
        <div className="LoginForm">
            <Card title="Login" className="LoginForm__card">
                <Form onSubmit={handleSubmit} id="loginForm">
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

                    <Form.Item {...formItemLayout} label="Password" >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password!' }] 
                        })
                        (<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                    </Form.Item>

                    <div className="LoginForm__submitButtonDiv">
                        <Button htmlType='submit' className="LoginForm__submitButton">Submit</Button>
                    </div>

                </Form>
            </Card>
        </div>

    );
}
export default Form.create({ name: 'loginForm' })(withRouter(LoginForm));