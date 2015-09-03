var mongoAdapter = require('../db/mongoAdapter');
var Room = require('../collections/Room');

var data = {
  "product" : {
    "item_id" : "108607358",
    "item_topic" : "Macbook Air Mid2012",
    "item_price" : "15000",
    "item_image" : "https://i2.24x7th.com/df/0/ui/post/2015/08/05/8/m/0c458d0d28bafe89f28da45e517f0500.jpeg"
  },
  "seller" : {
    "member_displayname" : "phatthana1",
    "display_image" : "https://i1.24x7th.com/df/0/ui/post/member/416/dc20f700267cbbffbaefa9bf0680b2d0.jpeg",
    "member_id" : "1041364_2"
  },
  "buyer" : {
    "member_displayname" : "Phatthana2",
    "display_image" : "https://i1.24x7th.com/df/0/ui/post/member/1352/d8f96ccc3455fa4fb351ded675e9e130.jpeg",
    "member_id" : "3381197_2"
  }
};

mongoAdapter.InitDB(function(err, result){
  var dataToInsert = [];
  for (var i = 0; i < 20; i++) {
    dataToInsert.push(JSON.parse(JSON.stringify(data)));
  }

  Room.insert(dataToInsert, function(err, docs) {
    console.log(docs);
  });

});
