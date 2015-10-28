
env = if typeof window != "undefined" then "browser" else "node"
console.log "running in env: #{env}"

b  = require 'bitcore'

if env == "node"
  fs = require 'fs'
  bc = require 'blockchain-api-basic'
  BitcoreExt = require './bitcore_ext'
else
  b = bitcore
  bc = BchainApi


class KeyChain
  key_path: "./.key"

  constructor: ->
    console.log "init keychain"
    @privateKey = new b.PrivateKey @load_saved_key()
    @address    = @privateKey.toAddress()
    @address_s  = @address.toString()
    @save_key()

  balance: (cb) ->
    bc.balance @address, cb

  write: ->
    #bc.write @privateKey, "test_message"
    pen = new Pen
    pen.write @privateKey, "test_message"

  unspent: (callback) ->
    bc.unspent @address, callback

  load_saved_key: ->
    if env == "node" then @load_saved_key_node() else @load_saved_key_browser()

  load_saved_key_node: ->
    path = @key_path
    if fs.existsSync path
      fs.readFileSync(path).toString()

  load_saved_key_browser: ->
    localStorage.bp_pvt_key if localStorage && localStorage.bp_pvt_key

  save_key: ->
    if env == "node" then @save_key_node() else @save_key_browser()

  save_key_node: ->
    fs.writeFileSync './.key', @privateKey

  save_key_browser: ->
    localStorage.bp_pvt_key = @privateKey

  # accessors

  privateKey: ->
    @privateKey

  address: ->
    @address

  address_s: ->
    @address_s


class Pen
  constructor: ->
    @kc = new KeyChain

  write: (message) ->
    @kc.unspent (unspent) =>
      if unspent.error
        console.log unspent.error
      else
        unspent = unspent.unspent_outputs
        be = new BitcoreExt @kc.address_s, @kc.privateKey.toString()
        be.sign_and_broadcast message, unspent, (tx) ->
          console.log "TX DATA #{tx}"


# kc.balance (amount) ->
#   console.log "balance: #{amount} satoshi"

# module.exports = KeyChain

# message = "EW test :D!"
#
# pen = new Pen
# pen.write message
