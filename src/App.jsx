import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import Account from './pages/Account'
import LoginedPage from './pages/LoginedPage'

import { createBrowserHistory } from 'history'

import configureStore from './configureStore'

const history = createBrowserHistory()
const store = configureStore(history)
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route path="/account" component={Account} />
              <Route component={LoginedPage} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
