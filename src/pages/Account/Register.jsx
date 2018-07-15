import React, { Component } from 'react'

class Register extends Component {
  render() {
    return (
      <div>
        <h2>注册</h2>
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
            <tr>
              <td>重复密码</td>
              <td>
                <input type="password" ref={el => (this.password2 = el)} />
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <button type="button" onClick={() => {}}>
            注册
          </button>
        </p>
      </div>
    )
  }
}

export default Register
