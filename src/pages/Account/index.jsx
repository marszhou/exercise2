import React, { Component } from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import Register from './Register'
import Login from './Login'

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
          <Route path="/account/register" component={Register} />
          <Route path="/account/login" component={Login} />
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
