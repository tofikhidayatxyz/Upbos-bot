const Subscribe = use('@Model/Subscribe')
const User = use('@Model/User')
const Channel = use('@Model/Channel')

module.exports = async (msg, text) => {
  text = text.substr(1, text.length)
  if (text.length) {
    try {
      const user = await User.findOne({ userId: msg.author.id })
      const channel = await Channel.findOne({ channelId: msg.channel.id, user: user?._id })

      if (user && channel) {
        await Subscribe.deleteOne({ user: user?._id, channel: channel?._id, key: text.toLowerCase() })
        msg.reply(`Successfull remove key ${text} for channel ${msg.channel.name}`)
      } else {
        msg.reply(`YOU NEED TO ADD RSS TOKEN BEFORE SUBSCRIBE OR UNSUBSCRIBE TOPIC`)
      }
    } catch (e) {
      global.sendReport(e)
      msg.reply(e.message || 'Error on adding new subscribe key')
    }
  } else {
    msg.reply(`KEY INVALID !`)
  }
}

// !upwork subscribe {TOPIC}
