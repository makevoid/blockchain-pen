import React from 'react';
import { connect } from 'react-redux'

const Counters = props => (
  <div>
    {console.log(props)}
    {props.chars} / 75 chars - {props.messages} message(s) - {props.balance} mbtc
  </div>
)

const mapState = state => ({
  balance:  state.keychain.balance,
  messages: state.counters.messages,
  chars:    state.counters.chars,
})

const mapDispatch = dispatch => ({
  // ...
})

export default connect(mapState, mapDispatch)(Counters)
