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
    console.log("init keychain");
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
