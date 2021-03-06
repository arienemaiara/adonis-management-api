'use strict'

const Env = use('Env')
const Redis = use('Redis')

module.exports = {
    connection: Env.get('REDIS_CONNECTION', 'local'),
  
    local: {
      host: '127.0.0.1',
      port: 6379,
      password: null,
      db: 0,
      keyPrefix: ''
    }
}
