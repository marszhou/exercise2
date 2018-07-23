import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import BlogCreate from './Create'
import BlogEdit from './Edit'
import BlogList from './List'
import BlogView from './View'

import styles from '../../styles.module.css'

const index = ({ match }) => {
  const linkClassProps = {
    className: styles.defaultLink,
    activeClassName: styles.activeLink
  }
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        ·{' '}
        <NavLink to={`${match.path}/`} {...linkClassProps} exact>
          列表
        </NavLink>{' '}
        ·{' '}
        <NavLink to={`${match.path}/create`} {...linkClassProps}>
          创建
        </NavLink>{' '}
        ·
      </div>
      <Switch>
        <Route path={`${match.path}/create`} component={BlogCreate} />
        <Route path={`${match.path}/edit/:blogId(\\d+)`} component={BlogEdit} />
        <Route path={`${match.path}/:blogId(\\d+)`} component={BlogView} />
        <Route path={`${match.path}/`} component={BlogList} exact />
      </Switch>
    </div>
  )
}

export default index
