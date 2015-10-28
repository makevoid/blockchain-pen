# bp = require "blockchain_pen"

env = if typeof window != "undefined" then "browser" else "node"

if env == "node"
  BitcoreExt = require './bitcore_ext'


$ ->
  mex   = $ "input[name=message]"
  chars = $ ".chars_count"
  btn   = $ "button.main"
  qr_el = $ ".qr"
  addr  = $ ".address a"
  adqr  = $ ".address a, .qr"
  mex_n = $ ".messages_num"
  topup = $ ".topup_msg"

  message = ->
    mex.val()

  update_chars_count = ->
    chars.html message().length

  write = (message) ->
    console.log "write #{message}"

  set_address = (address) ->
    addr.html address
    new QRCode qr_el.get(0),
      text:  address,
      width:  200,
      height: 200,
      colorDark : "#000000",
      colorLight : "#ffffff"
      correctLevel : QRCode.CorrectLevel.H

  # events

  mex.on "keyup", ->
    console.log "keyup on input: mex (main message)"
    update_chars_count()

  btn.on "click", ->
    write message()

  adqr.on "click", ->
    qr_el.toggleClass "hidden"



  # keychain

  #
  kc = new KeyChain
  set_address kc.address_s
  kc.balance (amount) =>
    console.log "balance", amount
    messages = Math.ceil amount / 1000
    mex_n.html messages

  # kc.unspent (unspent) ->
  #   if unspent.error
  #     console.log unspent.error
  #   else
  #     unspent = unspent.unspent_outputs
  #     be = new BitcoreExt kc.address_s, kc.privateKey.toString()
  #     be.sign_and_broadcast "EX test :D!", unspent, (tx) ->
  #       console.log "TX DATA #{tx}"
