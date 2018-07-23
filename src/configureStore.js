import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { loadLoginInfo } from './utils/localStorage'
import { setLoginInfoForAxios } from './api'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = history => {
  const loginInfo = loadLoginInfo()
  if (loginInfo.sessionId) {
    setLoginInfoForAxios(loginInfo.sessionId)
  }
  const middlewares = [routerMiddleware(history), thunk, logger]
  const store = createStore(
    connectRouter(history)(rootReducer),
    {
      login: {
        session: loginInfo.sessionId,
        user: loginInfo.user
      }
    },
    composeEnhancers(applyMiddleware(...middlewares))
  )
  return store
}
export default configureStore
