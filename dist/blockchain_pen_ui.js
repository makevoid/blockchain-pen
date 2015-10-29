var BitcoreExt, env;

env = typeof window !== "undefined" ? "browser" : "node";

if (env === "node") {
  BitcoreExt = require('./bitcore_ext');
}

$(function() {
  var addr, adqr, btn, chars, message, mex, mex_n, out, pen, qr_el, set_address, topup, update_chars_count, write;
  mex = $("input[name=message]");
  chars = $(".chars_count");
  btn = $("button.main");
  qr_el = $(".qr");
  addr = $(".address a");
  adqr = $(".address a, .qr");
  mex_n = $(".messages_num");
  topup = $(".topup_msg");
  out = $(".outcome");
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
    return pen.write("test", function(tx) {
      console.log("finished! - tx:", tx);
      return out.html("tx written: " + tx);
    }, function(fail_mex) {
      console.error("Fail: " + fail_mex);
      return out.html("Error: '" + fail_mex + "'. Please retry in 1 block time (after about 7 minutes)");
    });
  });
  return adqr.on("click", function() {
    return qr_el.toggleClass("hidden");
  });
});
