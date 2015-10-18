# bp = require "blockchain_pen"

$ ->
  mex   = $ "input[name=message]"
  chars = $ ".chars_count"
  btn   = $ "button.main"
  qr    = $ ".qr"
  adqr  = $ ".address a, .qr"

  message = ->
    mex.val()

  update_chars_count = ->
    chars.html message().length

  write = (message) ->
    console.log "write #{message}"

  # events

  mex.on "keyup", ->
    console.log "keyup on input: mex (main message)"
    update_chars_count()

  btn.on "click", ->
    write message()

  adqr.on "click", ->
    qr.toggleClass "hidden"

  # keychain

  # new QRCode($("body").get(0), "asd")
  kc = new KeyChain
  console.log kc.address_s
