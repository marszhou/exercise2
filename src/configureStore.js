import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'

const configureStore = (history) => {
  const store = createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(routerMiddleware(history), thunk, logger)
  )
  return store
}
export default configureStore
