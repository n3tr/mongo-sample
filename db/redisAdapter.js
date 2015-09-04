var Redis = require('ioredis')
var redis = new Redis(6379, '192.168.99.100');
// var redis = new Redis({
//   port: 6379,          // Redis port
//   host: '128.199.202.34',   // Redis host
//   family: 4,           // 4 (IPv4) or 6 (IPv6)
//   password: 'Qaz1Wsx2',
//   db: 0
// });
exports.redis = redis;
