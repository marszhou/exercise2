import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import Register from './Register';
import Login from './Login';
class Account extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/account/register' component={Register}/>
          <Route path='/account/login' component={Login}/>
          <Redirect to='/account/login' />
        </Switch>
      </div>
    );
  }
}

export default Account;