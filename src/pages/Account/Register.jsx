import React, { Component } from 'react'
import {connect} from 'react-redux'
import actions from '../../actions';

class Register extends Component {
  render() {
    const {register} = this.props
    return (
      <div>
        <h2>注册</h2>
        <hr />
        <form
          ref={form => (this.form = form)}
          onSubmit={e => {
            e.preventDefault()
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
                  <input type="text" ref={el => (this.username = el)} />
                </td>
              </tr>
              <tr>
                <td>密码</td>
                <td>
                  <input type="password" ref={el => (this.password = el)} />
                </td>
              </tr>
              <tr>
                <td>重复密码</td>
                <td>
                  <input type="password" ref={el => (this.password2 = el)} />
                </td>
              </tr>
              <tr>
                <td>性别</td>
                <td>
                  <label>
                    <input type="radio" value={1} name="gender" /> 男
                  </label>{' '}
                  <label>
                    <input type="radio" value={2} name="gender" /> 女
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            <button type="submit">注册</button>
          </p>
        </form>
      </div>
    )
  }
}

Register = connect(null, actions.account)(Register)

export default Register
