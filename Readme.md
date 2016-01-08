# Blockchain Pen
### final, coffeescript version

use it:

### <http://blockchain-pen.mkvd.net>

```
note: You have to load some millibits in it 
the message embedded in a bitcoin transaction costs 0.1 mBTC (the price is per message)  (that's 0.0001 BTC) 
so with 1 mBTC (0.001 BTC) you can  write 10 messages. 
Load them from your wallet / keychain software to the bitcoin account (address) linked via 
copy-paste or by scanning the QR code
enjoy!
```

### Infos

how it works under the hood

- uses blockchain.info to get balance and utxo (see npm module `blockchain-info-api-basic`)
- calculates balance in remaining message to write (instead of btc or mbtc)
- uses blockcypher api to broadcast the transaction (blockchain.info doesn't accepts op_return tx yet?)
- generates an address using bitcore-lib clientside and saves it to localStorage
- signs thre transaction with bitcore and adds the message (OP_RETURN - bitcoin addData function)
- a very simple ui using zepto (jquery-like)

that's basically it!

<a href="http://blockchain-pen.mkvd.net">
![](http://mkvd.s3.amazonaws.com/pics/blockchainpen_mindblown.png)
</a>

enjoy!

### For Developers:

download the source:

    git clone https://github.com/makevoid/blockchain_pen_coffee

run it:

    python -m SimpleHTTPServer 3000


open <http://localhost:3000>

### Edits

run `guard` to compile the coffeescript files into js

yes,

run:

    guard


### Node

if you want to run pen_cli.coffee with nodejs

Get Coffee:

    npm install -g coffee-script


run:

    coffee pen_cli.coffee

### More infos

watch the #bcpen and #blockchain-pen tags on twitter



### Current status

EW ♪ ♪ ♪♪♪   ♪♪♪♪   integration done - prefix with EW and see on eternitywall.it    ♪♪♪♪♪

how I use this thing: http://eternitywall.it/search?q=makevoid
