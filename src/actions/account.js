import api from '../api'

export const register = (username, password) => dispatch => {
  // 验证一下username password是否合法
  // const valid = false
  // if (!valid) {
  //   dispatch({
  //     type: 'ACCOUNT.USERNAME_INVALID',
  //     message: '用户名不合法（...）'
  //   })

  //   return Promise.resolve()
  // }

  return api.account.register(username, password).then(
    response => {
      // 成功
      dispatch({
        type: 'ACCOUNT.REGISTER_SUCCESS',
        userId: response.data.userId
      })
    },
    response => {
      // 失败
      dispatch({
        type: 'ACCOUNT.REGISITER_FAILED',
        error: response.data
      })
    }
  )
}

export const login = (username, password) => dispatch => {
  if (!username || !password) {
    return Promise.reject(
      dispatch({
        type: 'ACCOUNT.LOGIN_ERROR',
        error: {
          code: 'FORM_IMCOMPLETED',
          msg: '用户名密码必须填写'
        }
      })
    )
  }
  dispatch({
    type: 'ACCOUNT.LOGIN_REQUEST'
  })
  return api.account.login(username, password).then(
    response => {
      dispatch({
        type: 'ACCOUNT.LOGIN_SUCCESS',
        response: response.data
      })
    },
    ({ response }) => {
      throw dispatch({
        type: 'ACCOUNT.LOGIN_FAILED',
        error: response.data
      })
    }
  )
}
