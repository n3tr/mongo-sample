var mongo = require('mongodb');
var Db = require('mongodb').Db;

var ReplSet = require('mongodb').ReplSet;
var ObjectID = require('mongodb').ObjectID;
var Server = require('mongodb').Server;
var _dbPort = 27017;
var _dbServers = ['128.199.163.221',"128.199.120.12","128.199.100.217"];
var _dbName = 'SampleMongo';

var _curDB = null;

var DataBase = function () {
};

DataBase.GetDB = function () {
  if (typeof DataBase.db === 'undefined') {
    DataBase.InitDB();
  }
  return DataBase.db;
};

DataBase.InitDB = function (callback) {
  if (_curDB === null || _curDB === undefined ||_curDB === '') {
    _curDB = _dbName;
  }

  var servers = _dbServers.map(function(ip){
    return new Server(ip, 27017);
  })

  DataBase.db = new Db(_curDB, new ReplSet(servers));
    DataBase.db.open(function (err, db) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log('connected to database :: ' + _curDB);
        if (callback !== undefined) {callback(err, db);}
      }
    });
  };

  DataBase.Disconnect = function () {
    if (DataBase.db) {
      DataBase.db.close();
    }
  };

  DataBase.objectIdFromString = function (id) {
    return new ObjectID(id);
  };

  module.exports = DataBase;
