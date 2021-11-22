const redis = use('redis')
const env = use('dotenv')

env.config()

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  db: 10,
})

client.on('error', function (error) {
  console.error(error)
})

module.exports = client
