import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { loginSelectors } from '../../reducers'
import _ from 'lodash'
import DisplayError from '../../components/DisplayError';
class Login extends Component {
  render() {
    const { isRequest, login, location, error } = this.props
    return (
      <div>
        <h2>登录</h2>
        <hr />
        <table>
          <tbody>
            <tr>
              <td>用户名</td>
              <td>
                <input type="text" ref={el => (this.username = el)} />
              </td>
            </tr>
            <tr>
              <td>密码</td>
              <td>
                <input type="password" ref={el => (this.password = el)} />
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <button
            type="button"
            onClick={() => {
              login(
                this.username.value,
                this.password.value,
                _.get(location, 'state.from', {})
              )
            }}
            disabled={isRequest}
          >
            登录
          </button>
        </p>
        {error ? <DisplayError message={error.msg} /> : null}
      </div>
    )
  }
}

Login = connect(
  state => ({
    isRequest: loginSelectors.getIsRequest(state),
    error: loginSelectors.getError(state)
  }),
  actions.account
)(Login)

export default Login
