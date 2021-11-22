const Subscribe = use('@Model/Subscribe')
const User = use('@Model/User')
const Channel = use('@Model/Channel')

module.exports = async (msg, text) => {
  try {
    const user = await User.findOne({ userId: msg.author.id })
    const channel = await Channel.findOne({ channelId: msg.channel.id, user: user?._id })

    if (user && channel) {
      await Subscribe.deleteMany({ user: user?._id, channel: channel?._id })
      msg.reply(`Successfull remove all key for channel ${msg.channel.name}`)
    } else {
      msg.reply(`YOU NEED TO ADD RSS TOKEN BEFORE SUBSCRIBE OR UNSUBSCRIBE TOPIC`)
    }
  } catch (e) {
    global.sendReport(e)
    msg.reply(e.message || 'Error on adding new subscribe key')
  }
}

// !upwork unsubscribe-all
