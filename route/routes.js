const express = require('express');
const router = express.Router();

const Item = require('../model/shoppingItem');

// retrieving data from database
router.get('/items', (req, res, next) => {
    Item.find(function(err, items) {
        if (err) {
            res.json(err);
        } else {
            res.json(items);
        }
    });
});

// inserting new data
router.post('/item', (req, res, next) => {
    console.log(req.body);
    let newShoppoingItem = new Item({
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        itemBought: req.body.itemBought
    });

    newShoppoingItem.save((err, item) => {
        if (err) {
            res.json(err);
        } else {
            res.json({msg: 'save completed!'});
        }
    })
});


// updating the data
router.put('/item/:id', (req, res, next) => {
    Item.findOneAndUpdate({_id: req.params.id}, {
        $set: {
            itemName: req.body.itemName,
            itemQuantity: req.body.itemQuantity,
            itemBought: req.body.itemBought
        }
    }, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});


// deleting the data
router.delete('/item/:id', (req, res, next) => {
    Item.deleteOne({_id: req.params.id}, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;