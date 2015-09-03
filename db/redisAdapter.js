var Redis = require('ioredis');
var redis = new Redis(6379, '192.168.99.100');
exports.redis = redis;
