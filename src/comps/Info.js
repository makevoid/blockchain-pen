import React from 'react'
import { connect } from 'react-redux'
import AddressIdenticon from './AddressIdenticon'
import QRCode from 'qrcode.react'
import './Info.css'

const Info = props => (
  <div className="Info">
    <AddressIdenticon />
    <div className="btcAddress">Bitcon Address: {props.address}</div>
    <div>You can send {props.messagesBalance} messages - <a href='#'>top up</a></div>
    <QRCode value={props.address} />
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
