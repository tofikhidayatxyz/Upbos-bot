const updateOrCreateOne = use('@Model/Methods/UpdateOrCreateOne')
const mongoose = use('@Driver/MongoDB')

const channelSchema = new mongoose.Schema({
  channelId: String,
  channelName: String,
  securityToken: String,
  userUid: String,
  orgUid: String,
  type: {
    type: String,
    default: 'discord',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

// inject methods
updateOrCreateOne(channelSchema)

const channel = mongoose.model('Channel', channelSchema)

module.exports = channel
