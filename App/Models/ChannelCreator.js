const updateOrCreateOne = use('@Model/Methods/UpdateOrCreateOne')
const mongoose = use('@Driver/MongoDB')

const channelSchema = new mongoose.Schema(
  {
    channelId: String,
    channelName: String,
    index: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

// inject methods
updateOrCreateOne(channelSchema)

const channel = mongoose.model('channel-creator', channelSchema)

module.exports = channel
