import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { loginSelectors } from '../reducers';

const PrivateRoute = ({ component: Component, isLogined, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLogined ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/account/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default connect(state => ({
  isLogined: !!loginSelectors.getSession(state)
}))(PrivateRoute)
