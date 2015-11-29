var BitcoreExt, BlockCypher, HTTP, TX_FEE, bitcore;

TX_FEE = 10000;

bitcore = require('bitcore');

BlockCypher = (function() {
  function BlockCypher() {}

  BlockCypher.pushtx = function(tx_hash, callback, errback) {
    var post_params, pushtx_url;
    pushtx_url = "https://api.blockcypher.com/v1/btc/main/txs/push";
    post_params = {
      tx: tx_hash
    };
    return HTTP.post(pushtx_url, post_params, callback, errback);
  };

  return BlockCypher;

})();

HTTP = (function() {
  function HTTP() {}

  HTTP.post = function(url, params, callback, errback) {
    var ajax, data, error, success;
    success = function(data) {
      return callback(data);
    };
    error = function(fail_message) {
      fail_message = JSON.parse(fail_message.response);
      return errback(fail_message.error);
    };
    data = {
      tx: params.tx
    };
    ajax = {
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      processData: false,
      type: 'POST',
      success: success,
      error: error,
      url: url
    };
    return $.ajax(ajax);
  };

  return HTTP;

})();

BitcoreExt = (function() {
  function BitcoreExt(address1, pvt_key_string) {
    this.address = address1;
    this.pvt_key_string = pvt_key_string;
  }

  BitcoreExt.prototype.store_utxos = function(tx_ids) {
    var store, utxos;
    store = localStorage;
    utxos = store.utxos ? JSON.parse(store.utxos) : [];
    utxos = utxos.concat(tx_ids);
    return store.utxos = JSON.stringify(utxos);
  };

  BitcoreExt.prototype.sign_and_broadcast = function(message, utxos, callback, errback) {
    var address, amount, amount_btc, amount_satoshis, does_include, fee, i, is_empty, len, pvt_key, store, total_amount_sathoshis, transaction, tx_amount, tx_hash, tx_id, tx_ids, utxo, utxos_out;
    store = localStorage;
    does_include = function(array, element) {
      return array.indexOf(element) !== -1;
    };
    is_empty = function(val) {
      return !val || val.length === 0;
    };
    tx_amount = 1000;
    utxos_out = [];
    total_amount_sathoshis = 0;
    tx_ids = [];
    for (i = 0, len = utxos.length; i < len; i++) {
      utxo = utxos[i];
      amount_satoshis = utxo.value;
      total_amount_sathoshis += amount_satoshis;
      amount_btc = new bitcore.Unit.fromSatoshis(amount_satoshis).BTC;
      tx_id = utxo.tx_hash_big_endian;
      tx_ids.push(tx_id);
      if (store && store.utxos && does_include(JSON.parse(store.utxos), tx_id)) {
        console.log("skipping transaction: " + tx_id);
        continue;
      }
      utxos_out.push({
        address: this.address,
        txId: tx_id,
        scriptPubKey: utxo.script,
        amount: amount_btc,
        vout: utxo.tx_output_n
      });
      if (amount_satoshis > TX_FEE + tx_amount) {
        break;
      }
    }
    console.log(is_empty(utxos_out));
    if (!is_empty(utxos_out)) {
      fee = TX_FEE;
      address = this.address;
      amount = tx_amount;
      pvt_key = this.pvt_key_string;
      transaction = new bitcore.Transaction().from(utxos_out).to(address, amount).change(address).fee(fee).addData(message).sign(pvt_key);
      try {
        tx_hash = transaction.serialize();
      } catch (_error) {
        console.log("retrying serialization with unchecked = true");
        tx_hash = transaction.serialize(true);
      }
      return BlockCypher.pushtx(tx_hash, (function(_this) {
        return function(tx_response) {
          _this.store_utxos(tx_ids);
          tx_id = tx_response.tx.hash;
          return callback(tx_id);
        };
      })(this), errback);
    } else {
      console.error("ERROR: Not enough UTXOs");
      return errback("It seems you don't have any available transaction output to spend, you have to wait for the next block to be confirmed or you can deposit at least 0.11 mbtc to be able to write another message.");
    }
  };

  return BitcoreExt;

})();

if (typeof module !== "undefined" && module !== null) {
  module.exports = BitcoreExt;
}
