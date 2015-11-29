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

var BitcoreExt, KeyChain, b, bc, env, fs;

env = typeof window !== "undefined" ? "browser" : "node";

console.log("running in env: " + env);

b = require('bitcore');

if (env === "node") {
  fs = require('fs');
  bc = require('blockchain-api-basic');
  BitcoreExt = require('./bitcore_ext');
} else {
  b = bitcore;
  bc = BchainApi;
}

KeyChain = (function() {
  KeyChain.prototype.key_path = "./.key";

  function KeyChain() {
    this.privateKey = new b.PrivateKey(this.load_saved_key());
    this.address = this.privateKey.toAddress();
    this.address_s = this.address.toString();
    this.save_key();
  }

  KeyChain.prototype.balance = function(cb) {
    return bc.balance(this.address, cb);
  };

  KeyChain.prototype.write = function() {
    var pen;
    pen = new Pen;
    return pen.write(this.privateKey, "test_message");
  };

  KeyChain.prototype.unspent = function(callback) {
    return bc.unspent(this.address, callback);
  };

  KeyChain.prototype.load_saved_key = function() {
    if (env === "node") {
      return this.load_saved_key_node();
    } else {
      return this.load_saved_key_browser();
    }
  };

  KeyChain.prototype.load_saved_key_node = function() {
    var path;
    path = this.key_path;
    if (fs.existsSync(path)) {
      return fs.readFileSync(path).toString();
    }
  };

  KeyChain.prototype.load_saved_key_browser = function() {
    if (localStorage && localStorage.bp_pvt_key) {
      return localStorage.bp_pvt_key;
    }
  };

  KeyChain.prototype.save_key = function() {
    if (env === "node") {
      return this.save_key_node();
    } else {
      return this.save_key_browser();
    }
  };

  KeyChain.prototype.save_key_node = function() {
    return fs.writeFileSync('./.key', this.privateKey);
  };

  KeyChain.prototype.save_key_browser = function() {
    return localStorage.bp_pvt_key = this.privateKey;
  };

  KeyChain.prototype.privateKey = function() {
    return this.privateKey;
  };

  KeyChain.prototype.address = function() {
    return this.address;
  };

  KeyChain.prototype.address_s = function() {
    return this.address_s;
  };

  return KeyChain;

})();

if (typeof module !== "undefined" && module !== null) {
  module.exports = KeyChain;
}

var KeyChain, Pen;

if (typeof module !== "undefined" && module !== null) {
  KeyChain = require('./keychain');
}

Pen = (function() {
  function Pen() {
    this.kc = new KeyChain;
  }

  Pen.prototype.address = function() {
    return this.kc.address_s;
  };

  Pen.prototype.balance = function(callback) {
    return this.kc.balance(function(amount) {
      return callback(amount);
    });
  };

  Pen.prototype.write = function(message, callback, errback) {
    return this.kc.unspent((function(_this) {
      return function(unspent) {
        var be;
        if (unspent.error) {
          return console.log(unspent.error);
        } else {
          unspent = unspent.unspent_outputs;
          be = new BitcoreExt(_this.kc.address_s, _this.kc.privateKey.toString());
          return be.sign_and_broadcast(message, unspent, callback, errback);
        }
      };
    })(this));
  };

  return Pen;

})();

if (typeof module !== "undefined" && module !== null) {
  module.exports = Pen;
}

var BitcoreExt, env;

env = typeof window !== "undefined" ? "browser" : "node";

if (env === "node") {
  BitcoreExt = require('./bitcore_ext');
}

$(function() {
  var addr, adqr, btn, chars, ew_pf, ext_b, extra, message, mex, mex_n, out, pen, qr_el, rev_p, set_address, topup, update_chars_count;
  mex = $("input[name=message]");
  chars = $(".chars_count");
  btn = $("button.main");
  qr_el = $(".qr");
  addr = $(".address a");
  adqr = $(".address a, .qr");
  mex_n = $(".messages_num");
  topup = $(".topup_msg");
  out = $(".outcome");
  ext_b = $(".extra_btn");
  extra = $(".extra_content");
  rev_p = $(".reveal_pvtkey");
  ew_pf = $(".add_ew_prefix");
  message = function() {
    return mex.val();
  };
  update_chars_count = function() {
    return chars.html(message().length);
  };
  set_address = function(address) {
    addr.html(address);
    return new QRCode(qr_el.get(0), {
      text: address,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  };
  pen = new Pen;
  set_address(pen.address());
  pen.balance((function(_this) {
    return function(amount) {
      var messages;
      console.log("balance", amount);
      messages = Math.ceil(amount / 10000);
      return mex_n.html(messages);
    };
  })(this));
  mex.on("keyup", function() {
    return update_chars_count();
  });
  btn.on("click", function() {
    out.show();
    return pen.write(mex.val(), function(tx) {
      console.log("finished! - tx:", tx);
      return out.html("tx written: <a href='https://live.blockcypher.com/btc/tx/" + tx + "/'>" + tx + "</a>");
    }, function(fail_mex) {
      console.error("Fail: " + fail_mex);
      return out.html("Error: '" + fail_mex + "'. Please retry in 1 block time (after about 7 minutes)");
    });
  });
  adqr.on("click", function() {
    return qr_el.toggleClass("hidden");
  });
  ext_b.on("click", (function(_this) {
    return function() {
      extra.toggleClass("hidden");
      return ext_b.addClass("hidden");
    };
  })(this));
  ew_pf.on("click", (function(_this) {
    return function() {
      var msg;
      msg = mex.val();
      if (msg.slice(0, 2) !== "EW") {
        return mex.val("EW " + msg);
      }
    };
  })(this));
  return rev_p.on("click", function() {
    alert("Check the developer console of your browser\nYour private key has been written there.");
    console.log("This is your private key in the WIF format:");
    console.log("-----------------------------------------------------");
    console.log(pen.kc.privateKey.toWIF());
    return console.log("-----------------------------------------------------");
  });
});