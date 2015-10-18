b  = require 'bitcore'
# bc = require 'blockchain-api-basic'
# request = require 'superagent'
bc = { balance: -> }
# bc = BchainApi

env = if typeof window != "undefined" then "browser" else "node"
console.log "running in env: #{env}"

if env == "node"
  fs = require 'fs'


class Pen
  write: (privateKey, message) ->
    pushtx_url = "https://api.blockcypher.com/v1/btc/main/txs/push"
    request
    tx: tx_hash

    # callback
    # tx_info.tx.hash

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

  unspent: ->
    bc.unspent @address

  load_saved_key: ->
    if env == "node" then @load_saved_key_node() else @load_saved_key_browser()

  load_saved_key_node: ->
    path = @key_path
    if fs.existsSync path
      fs.readFileSync(path).toString()

  load_saved_key_browser: ->

  save_key: ->
    if env == "node" then @save_key_node() else @save_key_browser()

  save_key_node: ->
    fs.writeFileSync './.key', @privateKey

  save_key_browser: ->
    @privateKey

  # accessors

  privateKey: ->
    @privateKey

  address: ->
    @address

  address_s: ->
    @address_s


# kc = new KeyChain
# console.log kc.address_s
# unspent = kc.unspent()
# if unspent.error
#   console.log unspent.error
# else
#   unspent

# kc.balance (amount) ->
#   console.log "balance: #{amount} satoshi"


# module.exports = KeyChain
