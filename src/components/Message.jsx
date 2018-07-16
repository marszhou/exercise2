import React from 'react'
import { connect } from 'react-redux';
import { getMessage } from '../reducers';

let Message = ({text, isHiding}) => {
  return (
    <div
      style={{
        transition: 'all 0.5s ease-out',
        position: 'fixed',
        top: isHiding ? '-2.2em':0,
        height: '2em',
        lineHeight: '2em',
        border: '1px solid gray',
        margin: 'auto',
        background: '#f9ffc4',
        zIndex: 1,
        left: '50%',
        width: 600,
        marginLeft: -300,
        textAlign: 'center'
      }}
    >
      {text}
    </div>
  )
}

Message = connect((state) => ({
  ...getMessage(state)
}))(Message)

export default Message
