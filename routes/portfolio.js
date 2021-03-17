/* TRADE-SERVER  portfolio.js   */

var express = require('express');
var router = express.Router();
const {Portfolio} = require('../lib/models');
const {Wallet} = require('../lib/models')
const yahooStockPrices = require('yahoo-stock-prices')


// NON-REST - CUSTOM
// GET /api/v1/stocks/search?symbol=AAPL
// GET /api/v1/stocks/search/AAPL
// GET /api/v1/stocks/search/MSFT
// POST /api/v1/stocks/search req.body


// SEARCH  stock symbol
router.get('/search/:symbol', async function(req, res, next) {
    console.log(req.query)
    console.log(req.params)
    try {
        const data = await yahooStockPrices.getCurrentData(req.params.symbol);
        res.json({success: true, data: data});
    } catch(err){
        res.json({success: false, data: {}});
    }

})

// CREATE
// post request Buy Stock  , write to Portfolio table
router.post('/', async function(req, res, next) {
    console.log("THIS IS DATABASE WRITE REQ :" + req.body)
    let stock = await Portfolio.create(req.body);
    res.json(stock);

    // calc total stock purchase
    let stockPurch = (req.body.quantity * req.body.price);

    // UPDATE Wallet ...
    // Read Wallet table, then update with new Wallet after purch
    let WalletObj = await Wallet.findOne({});
    let initialWallet = WalletObj.value;
    let newWallet = initialWallet-stockPurch;
    // Update WalletObject and Database !
    WalletObj.update({value: newWallet});
});



// UPDATE
router.put('/:id', async function(req, res, next) {
    console.log(req.body)
    console.log(req.params)
    // let stock = await Stock.update()
    // let stock = Stock.update(req.body, {where: req.params.id})
    let stock = await Portfolio.update(req.body, {
        where: {id: req.params.id}
    });
    res.json(stock);
});

// DELETE - Sell
router.delete('/:id', async function(req, res, next) {

    let currentStock = await Portfolio.findOne({where: {id: req.params.id}});
    if(currentStock) {
        let symbol = currentStock.symbol;
        let quantity = currentStock.quantity;
        const data = await yahooStockPrices.getCurrentData(symbol);
        console.log(data)

        let cashEarnedFromStockSale = parseInt(parseInt(quantity) * data.price);

        let currentWallet = await Wallet.findOne({});
        if(currentWallet){
            let currentWalletValue = parseInt(currentWallet.value);
            let newWalletValue = currentWalletValue + cashEarnedFromStockSale;
            console.log('newWalletValue', newWalletValue);
            await currentWallet.update({value: newWalletValue})
        }

        let stock = await Portfolio.destroy({where: {id: req.params.id}});

        res.json(stock);

    }

});


/* Check to see if Portfolio db exists */
router.get('/', async function(req, res, next) {

    let items = await Portfolio.findAll({})

    console.log(items);
    res.json(items);
});

module.exports = router;
