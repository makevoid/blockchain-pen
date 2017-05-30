# TX_FEE = 10_000 # this was good until early 2017 when the minimum fee set as this was ok, 30_000 (30k sat. per transaction) was still ok to have good confirmation times - note that for an op return message you just need the minimum fee that can confirm your transaciton in x blocks
# TX_FEE = 31_000 # almost enough 
TX_FEE = 35_000    
TX_FEE = 40_000   # probably too much, let's try with 40k sat per tx

bitcore = require 'bitcore'

class BlockCypher
  @pushtx: (tx_hash, callback, errback) ->
    pushtx_url = "https://api.blockcypher.com/v1/btc/main/txs/push"

    post_params =
      tx: tx_hash

    HTTP.post pushtx_url, post_params, callback, errback


class HTTP
  @post: (url, params, callback, errback) ->

    success = (data) ->
      callback data

    error = (fail_message) ->
      fail_message = JSON.parse fail_message.response
      errback fail_message.error

    data =
      tx: params.tx

    ajax =
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      processData: false,
      type: 'POST',
      success: success,
      error: error,
      url: url

    $.ajax ajax


class BitcoreExt
  constructor: (@address, @pvt_key_string) ->

  store_utxos: (tx_ids) ->
    store = localStorage
    utxos = if store.utxos then JSON.parse(store.utxos) else []
    utxos = utxos.concat tx_ids
    store.utxos = JSON.stringify utxos

  sign_and_broadcast: (message, utxos, callback, errback) ->
    store = localStorage

    # tools
    does_include = (array, element) ->
      array.indexOf(element) != -1

    is_empty = (val) ->
      !val || val.length == 0

    # console.log "sign and broadcast"
    tx_amount = 1000

    # console.log "utxo_count", utxos.length
    utxos_out = []
    # total_amount_sathoshis = 0
    tx_ids = []

    for utxo in utxos
      # console.log utxos
      amount_satoshis = utxo.value
      # total_amount_sathoshis += amount_satoshis
      amount_btc = new bitcore.Unit.fromSatoshis(amount_satoshis).BTC
      tx_id = utxo.tx_hash_big_endian
      tx_ids.push tx_id

      # USE ALL INPUTS VERSION (TODO: FIXME:)
      #
      # if store && store.utxos && does_include(JSON.parse(store.utxos), tx_id)
      #   console.log "skipping transaction: #{tx_id}"
      #   continue

      utxos_out.push
        address:      @address
        txId:         tx_id
        scriptPubKey: utxo.script
        amount:       amount_btc
        vout:         utxo.tx_output_n

      # break if amount_satoshis > TX_FEE+tx_amount

    console.log "UTXOS:", utxos_out
    console.log "...proceeding:"
    console.log is_empty utxos_out
    unless is_empty utxos_out
      fee = TX_FEE # from 5000 it should be a good fee
      address = @address
      amount  = tx_amount
      pvt_key = @pvt_key_string
      # console.log "utxos_out: ", utxos_out

      transaction = new bitcore.Transaction()
        .from(utxos_out)
        .to(address, amount)
        .change(address)
        .fee(fee)

      # actual
      # 
      # transaction
      #   .addData(message)

      # proposed

      transaction
        .addData("{\"a\":")
        .addData("\"b\"}")



      # saves the hash: { a: "b" }.to_json
      #

      #

      # transaction
      #   .addData(message)
      #   .addData(message)
      #   .addData(message)

      transaction.sign(pvt_key)

      # usage:
      #
      # 4.20
      #
      # http://blockchainpen.com
      #
      #
      # reset local storage
      #
      # backup private key


      try
        tx_hash = transaction.serialize()
      catch
        console.log "retrying serialization with unchecked = true"
        tx_hash = transaction.serialize true

      BlockCypher.pushtx tx_hash, (tx_response) =>
        @store_utxos tx_ids
        tx_id = tx_response.tx.hash
        callback tx_id
      , errback

    else
      console.error "ERROR: Not enough UTXOs"
      errback "It seems you don't have any available transaction output to spend, you have to wait for the next block to be confirmed or you can deposit at least 0.11 mbtc to be able to write another message."


module.exports = BitcoreExt if module?
