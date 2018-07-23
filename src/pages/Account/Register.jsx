import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { registerSelectors } from '../../reducers'

const styles = {
  error: {
    border: '1px solid red'
  }
}

const getFieldStyle = (error, field) => {
  if (error && error.code === 'FORM_IMCOMPLETE' && error.field === field) {
    return styles.error
  }
  return {}
}

const getFieldMsg = (error, field) => {
  if (error && error.code === 'FORM_IMCOMPLETE' && error.field === field) {
    return <span style={{color: 'red'}}>{error.msg}</span>
  }
}

class Register extends Component {
  render() {
    const { register, error, isRequest } = this.props
    return (
      <div>
        <h2>注册</h2>
        <hr />
        <form
          ref={form => (this.form = form)}
          onSubmit={e => {
            e.preventDefault()
            console.log(this.form.gender)
            if (isRequest) return
            const username = this.username.value.trim()
            const password = this.password.value.trim()
            const password2 = this.password2.value.trim()
            const gender = this.form.gender.value
            register(username, password, password2, gender)
          }}
        >
          <table>
            <tbody>
              <tr>
                <td>用户名</td>
                <td>
                  <input
                    type="text"
                    ref={el => (this.username = el)}
                    style={getFieldStyle(error, 'username')}
                  />
                </td>
                <td>{getFieldMsg(error, 'username')}</td>
              </tr>
              <tr>
                <td>密码</td>
                <td>
                  <input
                    type="password"
                    ref={el => (this.password = el)}
                    style={getFieldStyle(error, 'password')}
                  />
                </td>
                <td>{getFieldMsg(error, 'password')}</td>
              </tr>
              <tr>
                <td>重复密码</td>
                <td>
                  <input
                    type="password"
                    ref={el => (this.password2 = el)}
                    style={getFieldStyle(error, 'password2')}
                  />
                </td>
                <td>{getFieldMsg(error, 'password2')}</td>
              </tr>
              <tr>
                <td>性别</td>
                <td>
                  <label>
                    <input
                      type="radio"
                      value={1}
                      name="gender"
                      style={getFieldStyle(error, 'gender')}
                    />{' '}
                    男
                  </label>{' '}
                  <label>
                    <input
                      type="radio"
                      value={2}
                      name="gender"
                      style={getFieldStyle(error, 'gender')}
                    />{' '}
                    女
                  </label>
                </td>
                <td>{getFieldMsg(error, 'gender')}</td>
              </tr>
            </tbody>
          </table>
          <p>
            <button type="submit" disabled={isRequest}>
              注册
            </button>
          </p>
        </form>
      </div>
    )
  }
}

Register = connect(
  state => ({
    error: registerSelectors.getError(state),
    isRequest: registerSelectors.getIsRequest(state)
  }),
  actions.account
)(Register)

export default Register
