c = console
Pen = require './pen'


p = new Pen()
console.log "started blockchain pen with address: #{p.address()}\n\n"

console.log "trying to get the balance...\n"
p.balance (amount_satoshis) ->
  amount_mbtc = new Unit.fromSatoshis amount_satoshis
  console.log "#{p.address()}: #{amount} mBTC"
  
# TODO:  to finish, so you can post messages directly fom the terminal (needs an asciicast as well)
