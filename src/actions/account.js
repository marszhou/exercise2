import api, { setLoginInfoForAxios, unsetLoginInfoForAxios } from '../api'
import { push, replace } from 'connected-react-router'
import { triggerMessage } from './message';
import { saveLoginInfo, deleteLoginInfo } from '../utils/localStorage';

export const register = (username, password, password2, gender) => dispatch => {
  dispatch({
    type: 'ACCOUNT.REGISTER_REQUEST'
  })
  return api.account.register(username, password, password2, gender).then(
    response => {
      // 成功
      dispatch({
        type: 'ACCOUNT.REGISTER_SUCCESS',
        userId: response.data.userId
      })
      dispatch(push('/account/login'))
      dispatch(triggerMessage('注册成功，请登录'))
    },
    ({response}) => {
      // 失败
      dispatch({
        type: 'ACCOUNT.REGISTER_FAILED',
        error: response.data
      })
    }
  )
}

export const login = (username, password, from) => dispatch => {
  if (!username || !password) {
    dispatch({
      type: 'ACCOUNT.LOGIN_ERROR',
      error: {
        code: 'FORM_IMCOMPLETED',
        msg: '用户名密码必须填写'
      }
    })
    return Promise.resolve()
  }
  dispatch({
    type: 'ACCOUNT.LOGIN_REQUEST'
  })
  return api.account.login(username, password).then(
    response => {
      const {data} = response
      dispatch({
        type: 'ACCOUNT.LOGIN_SUCCESS',
        response: data
      })
      const url = from ? from.pathname + from.search + from.hash : '/'
      dispatch(push(url))
      dispatch(triggerMessage('登录成功'))
      saveLoginInfo(data)
      setLoginInfoForAxios(data.sessionId)
    },
    ({ response }) => {
      dispatch({
        type: 'ACCOUNT.LOGIN_FAILED',
        error: response.data
      })
    }
  )
}

export const logout = () => dispatch => {
  dispatch({
    type: 'ACCOUNT.LOGOUT'
  })
  deleteLoginInfo()
  dispatch(triggerMessage('退出登录'))
  dispatch(replace('/account/login'))
  unsetLoginInfoForAxios()
}