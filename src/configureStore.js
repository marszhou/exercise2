import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { loadLoginInfo } from './utils/localStorage';

const configureStore = (history) => {
  const loginInfo = loadLoginInfo()

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
