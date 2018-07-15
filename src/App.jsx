import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Account from './pages/Account'
import LoginedPage from './pages/LoginedPage'
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/account" component={Account} />
            <Route component={LoginedPage} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
