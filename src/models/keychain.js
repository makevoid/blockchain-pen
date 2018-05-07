import Keychain from 'bitcoinjs-keychain'
import reducers from '../reducers/keychain'
import effects from '../effects/keychain'

const keychainInstance = new Keychain()

const initialState = {
  keychain:         keychainInstance,
  address:          keychainInstance.address,
  initialized:      false,
  balance:          0,
  messagesBalance:  0,
}

const keychain = {
  state:    initialState,
  reducers: reducers,
  effects:  effects,
}

export default keychain
