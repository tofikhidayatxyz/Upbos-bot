const updateOrCreateOne = use('@Model/Methods/UpdateOrCreateOne')
const mongoose = use('@Driver/MongoDB')

const subscribeSchema = new mongoose.Schema({
  key: String,
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

updateOrCreateOne(subscribeSchema)

const subscribe = mongoose.model('Subscribe', subscribeSchema)

module.exports = subscribe
