import React from 'react'
import Identicon from './Identicon'
import { connect } from 'react-redux'
import './AddressIdenticon.css'

const AddressIdenticon = props => (
  <div class="AddressIdenticon">
    <Identicon address={props.address} />
  </div>
)

const mapState = state => ({
  address: state.keychain.address
})

const mapDispatch = dispatch => ({
  // ...
})

export default connect(mapState, mapDispatch)(AddressIdenticon)
