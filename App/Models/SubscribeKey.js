const updateOrCreateOne = use('@Model/Methods/UpdateOrCreateOne')
const mongoose = use('@Driver/MongoDB')

const subscribeSchema = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

updateOrCreateOne(subscribeSchema)

const subscribe = mongoose.model('SubscribeKey', subscribeSchema)

module.exports = subscribe
