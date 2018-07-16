import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import Account from './pages/Account'
import LoginedPage from './pages/LoginedPage'

import { createBrowserHistory } from 'history'

import configureStore from './configureStore'
import PrivateRoute from './components/PrivateRoute'
import Message from './components/Message';

const history = createBrowserHistory()
const store = configureStore(history)
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Message />
            <Switch>
              <Route path="/account" component={Account} />
              <PrivateRoute component={LoginedPage} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
