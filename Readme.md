# Blockchain Pen

A Pen (and webapp) to write "eternal" messages into the Blockchain.

Use it on:

### <http://blockchainpen.com>

Your message will be stored into a bitcoin transaction.
You  have to load some millibits in it to send a message to pay for the transaction fees.

The transaction cost is 0.1 mBTC (millibitcoin, that's 0.0001 BTC).

You can load the funds from your wallet / keychain software to the bitcoin account (address) that is shown on the right. Copy paste the address or scan the QR code, deposit your preferred amount. All the coins go to miners, BlockchainPen doesn't keep any key or bitcoins, the private key is generated locally in your browser via bitcore-lib, the transaction is done via Blockchain.info (get utxos) and Blockcypher APIs (pushtx).

Enjoy!


---

### More infos

how it works under the hood:

- uses blockchain.info to get balance and utxo (see npm module `blockchain-info-api-basic`)
- calculates balance in remaining message to write (instead of btc or mbtc)
- uses blockcypher api to broadcast the transaction (blockchain.info doesn't accepts op_return)
- generates an address using bitcore-lib clientside and saves it to localStorage
- signs thre transaction with bitcore and adds the message (OP_RETURN - bitcoin addData function)
- a very simple UI using zepto (jquery-like)

that's basically it!

<a href="http://blockchain-pen.mkvd.net">
![](http://mkvd.s3.amazonaws.com/pics/blockchainpen_mindblown.png)
</a>

---

### Run

`npm start`

This command starts the app in development mode.


### Build

This app is based on create-react-app. This means you can run:

`npm run build`

This will build the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

---

### Eternity Wall

You can use Blockchain Pen to write to EternityWall, just prepend `EW ` in front of your message, and after confirmation it will be posted on EternityWall:

##### <http://eternitywall.it>

You can put an hashtag or something, and then search your messages afterwards: http://eternitywall.it/search?q=makevoid


---

Enjoy!

[@makevoid](http://twitter.com/makevoid)
