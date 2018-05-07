import React from 'react';
import { connect } from 'react-redux'

const Counters = props => (
  <div>
    {props.charCount} / 75 chars - {props.messages} message(s) - {props.balance} mbtc
  </div>
)

const mapState = state => ({
  balance:   state.keychain.balance,
  messages:  state.message.messageCount,
  charCount: state.message.charCount,
})

const mapDispatch = dispatch => ({
  // ...
})

export default connect(mapState, mapDispatch)(Counters)
