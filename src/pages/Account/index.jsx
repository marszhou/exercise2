import React, { Component } from 'react'
import { Switch, NavLink, Route, Redirect } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import AccountRoute from '../../components/AccountRoute'
import Logout from './Logout'
import styles from '../../styles.module.css'
class Account extends Component {
  render() {
    const { match } = this.props
    const linkClassProps = {
      className: styles.defaultLink,
      activeClassName: styles.activeLink
    }
    return (
      <div>
        <div className={styles.navBar}>
          ·{' '}
          <NavLink to={`${match.path}/login`} {...linkClassProps}>
            登录
          </NavLink>{' '}
          ·{' '}
          <NavLink to={`${match.path}/register`} {...linkClassProps}>
            注册
          </NavLink>{' '}
          ·
        </div>
        <div className={styles.content}>
          <Route path="/account">
            <Switch>
              <AccountRoute
                path={`${match.path}/register`}
                component={Register}
              />
              <AccountRoute path={`${match.path}/login`} component={Login} />
              <Route path={`${match.path}/logout`} component={Logout} />
              <Redirect to={`${match.path}/login`} />
            </Switch>
          </Route>
        </div>
      </div>
    )
  }
}

export default Account
