var express = require('express');
var router = express.Router();
const {Wallet} = require('../lib/models');



// UPDATE - perform PUT request on http://localhost:3000/api/v1/wallet/:id




//  at start , see if wallet contains an entry , findOne
//  does not return wallet value.
router.get('/', async function(req, res, next) {

    let currentWallet = await Wallet.findOne({})
    console.log(currentWallet);
    res.json(currentWallet);
});

module.exports = router;
