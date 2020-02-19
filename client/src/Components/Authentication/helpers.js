// https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication
// ORMS, OAUTH2, https://github.com/dchester/epilogue , Access_- And Refresh-tokens! ,
// https://developer.okta.com/blog/2018/08/21/build-secure-rest-api-with-node
// https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/
// https://serverless-stack.com/chapters/add-the-session-to-the-state.html
import React, {useState, useEffect} from 'react';

import {Route} from 'react-router-dom'
import axios from 'axios'

let storage = window.localStorage

export const getAccessToken = () => storage.getItem('access_token')
// export const getRefreshToken = () => storage.get('refresh_token')
export const isAuthenticated = () => !!getAccessToken()

export const authenticate = async (props) => {
    console.log("THERE")
    let accessToken = getAccessToken()
    if (accessToken) {
      try {
        const access = await getAccess(accessToken) // call an API, returns tokens
        console.log("HERE")
        if(!access){redirectToLogin(props.history)}
        return access
      } catch (error) {
        redirectToLogin(props.history)
        return false
      }
    }
  
    redirectToLogin(props.history)
    return false
  }

  const redirectToLogin = (history) => {
    // history.push('/login')
    // return <Redirect to='/login' />
    window.location.replace(
      `${process.env.REACT_APP_SERVER_URL}/login`
    )
    // or history.push('/login') if your Login page is inside the same app
  }

export const AuthenticatedRoute = ({
    component: Component,
    exact,
    path,
  }) => {
      console.log(isAuthenticated())
      return (
  <Route
      exact={exact}
      path={path}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <AuthenticateBeforeRender render={() => <Component {...props} />} />
        )
      }
    />
  )}

  const AuthenticateBeforeRender = (props) => {
    console.log("AUTH2")
      const [isAuthenticated, setAuthenticated] = useState(false)
  console.log(isAuthenticated)
      useEffect(() => {
        authenticate(props).then(isAuthenticated => {
            setAuthenticated( isAuthenticated )
          })
      }, [])
  
    return (isAuthenticated ? props.render() : null);
  }

  const getAccess = async (accessToken) => {
    let post = {
        url: `${process.env.REACT_APP_SERVER_URL}/api/authenticate`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: { accessToken }
    }

    let result = await axios(post)
    let data = result.data
    console.log(data)
    return data.success
  }