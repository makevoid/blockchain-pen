
env = if typeof window != "undefined" then "browser" else "node"

c = console
c.log "running in env: #{env}"

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
    # bpen posts to wite:
    # EW #decentralized #ngrok #appidea #mkv # unrelated # TODO delete this comment
    # EW
    c.log "UNSPENT!"
    c.log bc
    bc.unspent(@address, callback)
      .then (data) ->
        c.log data.notice if data.notice
        # logif data, "notice" # add styntactic sugar via libraries to write the line above
        Promise.resolve data

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


module.exports = KeyChain if module?
