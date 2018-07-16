import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { loginSelectors } from '../reducers';

const AccountRoute = ({ component: Component, isLogined, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isLogined ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      )
    }
  />
)

export default connect(state => ({
  isLogined: !!loginSelectors.getSession(state)
}))(AccountRoute)
