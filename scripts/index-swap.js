const express = require('express')
const app = express()
const port = 3333

let db = require(__dirname+'/../libs/db.js');
let swapUtil = require(__dirname+'/../assets/swap0.js');

/*XMLHttpRequest = null;
window = {
  addEventListener:()=>{},
  removeEventListener:()=>{},
  //ethereum: {},
};
global = {};*/

//nodeExports = {};
//require(__dirname + '/../libs/web3');
//Web3 = nodeExports.Web3;
//console.log("Web3", Web3);

Web3 = require('web3');

swapUtil.init();


app.use(express.static(process.cwd() + '/assets'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/assets/index.html')
})

app.get('/createOrder', (req,res) => {
  let key = req.query.id;
  let value = {
    maker: req.query.maker,
    originToken: req.query.originToken,
    originAmount: req.query.originAmount,
    targetToken: req.query.targetToken,
    targetAmount: req.query.targetAmount,
    originNet: req.query.originNet,
    targetNet: req.query.targetNet,
  }
  db.set(key, value);
  res.send("success");
})

app.get('/getOrders', (req,res) => {
  res.send(db.load());
})

app.get('/wantOrder', (req,res) => {
  let key = req.query.id;
  let address = req.query.address;
  let value = db.get(key);
  console.log(value);
  value.taker = address;

  db.set(key, value);

  res.send(value);
});

app.get('/setHashOfSecret', (req,res) => {
  let key = req.query.id;
  let hash = req.query.hash;
  let value = db.get(key);
  console.log(value);
  value.hashOfSecret = hash;

  db.set(key, value);

  res.send(value);
})

app.get('/getOrdersEx', (req,res) => {
  let orders = db.load();
  swapUtil.hydrateOrders(orders, null, (err, data) => {
    res.send(err || data)
  })
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  //treasuryWallet = await startTreasuryWallet();
  //listenForBurnEvents();
})
