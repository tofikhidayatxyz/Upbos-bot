const env = use('dotenv')
const mongoose = use('mongoose')

env.config()

mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_COLLECTION}`, {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  auth: {
    authSource: process.env.MONGO_AUTH_DB,
  },
})

module.exports = mongoose
