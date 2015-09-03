var dataAccessAdapter = require('../db/mongoAdapter');

var RoomCollection = dataAccessAdapter.GetDB().collection('Rooms');
RoomCollection.createIndex({ seller_id: 1, buyer_id: 1, product_id: 1});
module.exports = RoomCollection;
