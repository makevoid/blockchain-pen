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
  out   = $ ".outcome"
  ext_b = $ ".extra_btn"
  extra = $ ".extra_content"
  rev_p = $ ".reveal_pvtkey"
  ew_pf = $ ".add_ew_prefix"

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


  # pen (main)

  pen = new Pen
  set_address pen.address()
  pen.balance (amount) =>
    console.log "balance", amount
    messages = Math.ceil amount / 10000
    mex_n.html messages


  # events

  mex.on "keyup", ->
    update_chars_count()

  btn.on "click", ->
    out.show()
    pen.write mex.val(), (tx) ->
      console.log "finished! - tx:", tx
      out.html "tx written: <a href='https://live.blockcypher.com/btc/tx/#{tx}/'>#{tx}</a>"
    , (fail_mex) ->
      console.error "Fail: #{fail_mex}"
      out.html "Error: '#{fail_mex}'. Please retry in 1 block time (after about 7 minutes)"

  adqr.on "click", ->
    qr_el.toggleClass "hidden"

  ext_b.on "click", =>
    extra.toggleClass   "hidden"
    ext_b.addClass "hidden"

  ew_pf.on "click", =>
    msg = mex.val()
    mex.val "EW #{msg}" unless msg[0..1] == "EW"

  rev_p.on "click", ->
    alert "Check the developer console of your browser\nYour private key has been written there."
    console.log "This is your private key in the WIF format:"
    console.log "-----------------------------------------------------"
    console.log pen.kc.privateKey.toWIF()
    console.log "-----------------------------------------------------"
