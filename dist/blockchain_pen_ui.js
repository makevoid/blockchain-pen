var BitcoreExt, env;

env = typeof window !== "undefined" ? "browser" : "node";

if (env === "node") {
  BitcoreExt = require('./bitcore_ext');
}

$(function() {
  var addr, adqr, btn, chars, kc, message, mex, mex_n, qr_el, set_address, topup, update_chars_count, write;
  mex = $("input[name=message]");
  chars = $(".chars_count");
  btn = $("button.main");
  qr_el = $(".qr");
  addr = $(".address a");
  adqr = $(".address a, .qr");
  mex_n = $(".messages_num");
  topup = $(".topup_msg");
  message = function() {
    return mex.val();
  };
  update_chars_count = function() {
    return chars.html(message().length);
  };
  write = function(message) {
    return console.log("write " + message);
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
  mex.on("keyup", function() {
    console.log("keyup on input: mex (main message)");
    return update_chars_count();
  });
  btn.on("click", function() {
    return write(message());
  });
  adqr.on("click", function() {
    return qr_el.toggleClass("hidden");
  });
  kc = new KeyChain;
  set_address(kc.address_s);
  return kc.balance((function(_this) {
    return function(amount) {
      var messages;
      console.log("balance", amount);
      messages = Math.ceil(amount / 1000);
      return mex_n.html(messages);
    };
  })(this));
});
