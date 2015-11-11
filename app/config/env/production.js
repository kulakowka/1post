let url = require('url')
let config = {}

config.server = {
  host: 'localhost',
  port: process.env.PORT || 3000
}

config.redis = {
  host: 'localhost',
  port: 6379,
  options: {

  }
}

if (process.env.REDIS_URL) {
  let redisToGoConfig = url.parse(process.env.REDIS_URL)
  config.redis.port = redisToGoConfig.port
  config.redis.host = redisToGoConfig.hostname
  config.redis.options.auth_pass = redisToGoConfig.auth.split(':')[1]
}

module.exports = config