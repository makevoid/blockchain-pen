KeyChain = require './keychain' if module?

class Pen
  constructor: ->
    @kc = new KeyChain

  address: ->
    @kc.address_s

  balance: (callback) ->
    @kc.balance (amount) ->
      callback amount

  write: (message, callback, errback) ->
    @kc.unspent (unspent) =>
      if unspent.error
        console.log unspent.error
      else
        unspent = unspent.unspent_outputs
        be = new BitcoreExt @kc.address_s, @kc.privateKey.toString()
        be.sign_and_broadcast message, unspent, callback, errback

module.exports = Pen if module?
