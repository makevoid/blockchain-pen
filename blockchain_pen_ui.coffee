bp = require "blockchain_pen"

$ ->
  mex   = $ "input[name=message]"
  chars = $ ".chars_count"
  btn   = $ "button.main"

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
