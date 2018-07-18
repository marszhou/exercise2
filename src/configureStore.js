import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { loadLoginInfo } from './utils/localStorage';
import { setLoginInfoForAxios } from './api';

const configureStore = (history) => {
  const loginInfo = loadLoginInfo()
  if (loginInfo.sessionId) {
    setLoginInfoForAxios(loginInfo.sessionId)
  }

  const store = createStore(
    connectRouter(history)(rootReducer),
    {
      login: {
        session: loginInfo.sessionId,
        user: loginInfo.user
      }
    },
    applyMiddleware(routerMiddleware(history), thunk, logger)
  )
  return store
}
export default configureStore
