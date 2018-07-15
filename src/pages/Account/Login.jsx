import React, { Component } from 'react'

class Login extends Component {
  render() {
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
          <button type="button" onClick={() => {}}>
            登录
          </button>
        </p>
      </div>
    )
  }
}

export default Login
