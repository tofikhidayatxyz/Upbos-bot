const updateOrCreateOne = use('@Model/Methods/UpdateOrCreateOne')
const mongoose = use('@Driver/MongoDB')

const userSchema = new mongoose.Schema({
  userId: String,
  username: String,
  type: {
    type: String,
    default: 'discord',
  },
  active: {
    type: Boolean,
    default: true,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubscribeKey',
  },
})

// method inject
updateOrCreateOne(userSchema)

const user = mongoose.model('User', userSchema)

module.exports = user
