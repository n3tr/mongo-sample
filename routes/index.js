var express = require('express');
var router = express.Router();


var RoomCollection = require('../collections/RoomCollection');
var mongoAdapter = require('../db/mongoAdapter');

var redis = require('../db/redisAdapter').redis;

/* GET home page. */
router.post('/rooms', function(req, res, next) {

  var roomId = mongoAdapter.objectIdFromString(req.body.room_id);

  redis.get(req.body.room_id, function (redisErr, result) {
    if (redisErr) {
      return res.send({error: redisErr.message});
    }

    if (result) {
      console.log("REDIS");
      return res.send(JSON.parse(result));
    }

    RoomCollection.find({_id: roomId}).limit(1).toArray(function(err, docs){
      if (err) {
        return res.send({error: err.message});
      }

      if (!docs || docs.length === 0) {
        return res.send({});
      }

      redis.set(req.body.room_id, JSON.stringify(docs[0]));
      res.send(docs[0]);
    });

  });


});

router.post('/rooms/create', function(req, res) {

  var seller_id = req.body.seller.member_id;
  var buyer_id = req.body.buyer.member_id;
  var product_id = req.body.product.item_id;
  var insertData = {
    seller_id: seller_id,
    buyer_id: buyer_id,
    product_id: product_id,
    room_detail: req.body
  };

  var query = {
    seller_id: seller_id,
    buyer_id: buyer_id,
    product_id: product_id
  };

  var update = {
    $set: insertData
  };

  RoomCollection.findAndModify(
    query, // query
    [['_id','asc']],  // sort order
    update, // replacement, replaces only the field "hi"
    { upsert: true, new: true }, // options
    function(err, object) {
      if (err){
        res.send({error: error.messages});
      }else{
        res.send(object);
      }
  });

});

module.exports = router;
