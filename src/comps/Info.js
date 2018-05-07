import React from 'react'
import { connect } from 'react-redux'
import './Info.css';

const Info = props => (
  <div className="Info">
    <div className="btcAddress">Bitcon Address: {props.address}</div>
    <div>{props.messagesBalance} messages</div>
  </div>
)

const mapState = state => ({
  address:          state.keychain.address,
  messagesBalance:  state.keychain.messagesBalance,
})

const mapDispatch = dispatch => ({
  // ...
})

export default connect(mapState, mapDispatch)(Info)
