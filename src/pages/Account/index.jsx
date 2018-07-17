import React, { Component } from 'react'
import { Switch, NavLink, Route, Redirect } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import AccountRoute from '../../components/AccountRoute';
import Logout from './Logout';

const navDefaultStyle = {
  color: 'blue',
  textDecoration: 'underline'
}
const navActiveStyle = {
  color: 'black',
  textDecoration: 'none'
}
class Account extends Component {
  render() {
    return (
      <div>
        <Switch>
          <AccountRoute path="/account/register" component={Register} />
          <AccountRoute path="/account/login" component={Login} />
          <Route path='/account/logout' component={Logout} />
          <Redirect to="/account/login" />
        </Switch>

        <div
          style={{
            position: 'absolute',
            bottom: 10,
          }}
        >
          <NavLink
            to="/account/login"
            style={navDefaultStyle}
            activeStyle={navActiveStyle}
          >
            登录
          </NavLink>{' '}
          |{' '}
          <NavLink
            to="/account/register"
            style={navDefaultStyle}
            activeStyle={navActiveStyle}
          >
            注册
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Account
