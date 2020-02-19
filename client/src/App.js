import React, { useEffect, useState } from 'react';
import {Fragment} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import {AuthenticatedRoute} from './Components/Authentication/helpers'
import './App.css';
import HomePage from './Pages/HomePage/HomePage'
import 'antd/dist/antd.css';
import Header from './Components/Header/Header'
import EventPage from './Pages/EventPage/EventPage'
import TicketsPage from './Pages/TicketsPage/TicketsPage'
import InsertPage from './Pages/InsertPage/InsertPage'
import ReceiptPage from './Pages/ReceiptPage/ReceiptPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import LoginForm from './Components/LoginForm/LoginForm'
import CreateUserForm from './Components/CreateUserForm/CreateUserForm'
import EventsInfoPage from './Pages/EventsInfoPage/EventsInfoPage'


function App() {

  const [organization, setOrganization] = useState('')
  const [ticketTime, setTicketTime] = useState('')
  const [showTimer, setShowTimer] = useState(false)

  useEffect(() => {
    window.BAPIjs.setPublicToken('myToken')
  }, [])

  return (
    <Fragment>
      <Header 
        organization={organization} 
        ticketTime={ticketTime}
        showTimer={showTimer}
      />
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/event' exact component={EventPage}/>
        <Route path='/tickets' exact component={TicketsPage}/>
        <Route path='/createUser' exact component={CreateUserForm}/>
        <AuthenticatedRoute path='/insert' exact component={InsertPage}/>
        <AuthenticatedRoute path='/eventsInfo' component={EventsInfoPage}/>
        <Route path='/event/:eventId' exact render={routeProps => <EventPage {...routeProps} setOrganization={setOrganization}/>}/>
        <Route path='/tickets/:eventId' exact render={routeProps => <TicketsPage {...routeProps} setTime={setTicketTime} setShowTimer={setShowTimer}/>}/>
        <Route path='/orders/:orderId' exact component={ReceiptPage}/>
        <Route path='/login' exact component={LoginForm}/>
        <Route exact component={NotFoundPage}/>
      </Switch>
    </Fragment>
  );
}

export default withRouter(App);
