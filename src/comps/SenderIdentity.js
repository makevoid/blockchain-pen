import React from 'react';
import Figure from './Figure'
import { connect } from 'react-redux'

const SenderIdentity = props => (
  <div>
    <Figure address={props.address} />
  </div>
)

const mapState = state => ({
  address: state.keychain.address
})

const mapDispatch = dispatch => ({
  // ...
})

export default connect(mapState, mapDispatch)(SenderIdentity)
