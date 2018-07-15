import api from '../api'

export const register = (username, password) => dispatch => {
  // 验证一下username password是否合法
  // const valid = false
  // if (!valid) {
  //   dispatch({
  //     type: 'ACCOUNT_USERNAME_INVALID',
  //     message: '用户名不合法（...）'
  //   })

  //   return Promise.resolve()
  // }

  return api.account.register(username, password).then(
    (response) => { // 成功
      dispatch({
        type: 'ACCOUNT_REGISTER_SUCCESS',
        userId: response.data.userId
      })
    },
    (response) => { // 失败
      dispatch({
        type: 'ACCOUNT_REGISITER_FAILED',
        error: response.data
      })
    }
  )
}

export const login = (username, password) => dispatch => {
  dispatch({
    type: 'LOGIN_REQUEST'
  })
  api.account.login(username, password).then(
    (response) => {
      dispatch({
        type: 'LOGIN_SUCCESS',
        session: response.data.sessionId
      })
    },
    (response) => {
      dispatch({
        type: 'LOGIN_FAILED',
        error: response.data
      })
    }
  )
}
