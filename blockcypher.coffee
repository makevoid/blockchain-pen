class BlockCypher
  @pushtx: (tx_hash, callback, errback) ->
    pushtx_url = "https://api.blockcypher.com/v1/btc/main/txs/push"

    post_params =
      tx: tx_hash

    HTTP.post pushtx_url, post_params, callback, errback
