# bp = require "blockchain_pen"

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
  console.log kc.address_s
  set_address kc.address_s
  console.log "asd"
  kc.balance (amount) ->
    console.log "asd222"
    console.log(amount)
  console.log "asd"
