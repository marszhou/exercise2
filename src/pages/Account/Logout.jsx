import React, { Component } from 'react';
import {connect} from 'react-redux'
import actions from '../../actions'

class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }
  render() {
    return null
  }
}
Logout = connect(null, actions.account)(Logout)

export default Logout;