import React from 'react'
import { connect } from 'react-redux'
import { loginSelectors } from '../reducers'
import { Link } from 'react-router-dom'

const LoginedPage = ({ loginUser }) => {
  return (
    <div>
      登录成功了，你是{loginUser.username}{' '}
      （只有登录成功后才会显示此页面，如果没有登录身份的时候，访问此页面都转向到/account/login）<Link to="/account/logout">
        退出登录
      </Link>
    </div>
  )
}

export default connect(state => ({
  loginUser: loginSelectors.getUser(state)
}))(LoginedPage)
