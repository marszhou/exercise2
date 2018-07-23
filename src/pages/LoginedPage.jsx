import React from 'react'
import { connect } from 'react-redux'
import { loginSelectors } from '../reducers'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import Blog from './Blog'
import styles from '../styles.module.css'

const LoginedPage = ({ loginUser }) => {
  const linkClassProps = {
    className: styles.defaultLink,
    activeClassName: styles.activeLink
  }
  return (
    <div>
      <div className={styles.navBar}>
        · 欢迎 {loginUser.username} ·{' '}
        <NavLink to="/blogs" {...linkClassProps}>
          日志
        </NavLink>{' '}
        ·{' '}
        <Link to="/account/logout" style={styles.normalStyle}>
          退出登录
        </Link>{' '}
        ·
      </div>
      <div className={styles.content}>
        <Switch>
          <Route path="/blogs" component={Blog} />
        </Switch>
      </div>
    </div>
  )
}

export default connect(state => ({
  loginUser: loginSelectors.getUser(state)
}))(LoginedPage)
