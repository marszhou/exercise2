import React, { Component } from 'react';
import {connect} from 'react-redux'
import actions from '../../actions';
import * as queryString from 'query-string'

class BlogList extends Component {
  componentWillMount() {
    const query = queryString.parse(this.props.location.search)
    const {page = 1} = query

    this.props.list((page-1) * 10)
  }

  render() {
    return (
      <div>
      list
      </div>
    );
  }
}

BlogList = connect(state=> ({

}), actions.blog)(BlogList)

export default BlogList;