var BitcoreExt, env;

env = typeof window !== "undefined" ? "browser" : "node";

if (env === "node") {
  BitcoreExt = require('./bitcore_ext');
}

$(function() {
  var addr, adqr, btn, chars, ew_pf, ext_b, extra, message, mex, mex_n, out, pen, qr_el, rev_p, set_address, topup, update_chars_count, write;
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
