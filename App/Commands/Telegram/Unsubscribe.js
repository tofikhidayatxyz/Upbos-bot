const Subscribe = use('@Model/Subscribe')
const User = use('@Model/User')
const Channel = use('@Model/Channel')

module.exports = async (ctx, text) => {
  try {
    text = text.substr(1, text.length)
    if (text.length) {
      try {
        const user = await User.findOne({ userId: ctx.message.from.id })
        const channel = await Channel.findOne({ channelId: ctx.message.chat.id, user: user?._id })

        if (user && channel) {
          await Subscribe.deleteOne({ user: user?._id, channel: channel?._id, key: text.toLowerCase() })
          ctx.reply(`Successfull remove key ${text} for channel ${ctx.message.chat.username || ctx.message.chat.name}`)
        } else {
          ctx.reply(`YOU NEED TO ADD RSS TOKEN BEFORE SUBSCRIBE OR UNSUBSCRIBE TOPIC`)
        }
      } catch (e) {
        global.sendReport(e)
        ctx.reply(e.message || 'Error on adding new subscribe key')
      }
    } else {
      ctx.reply(`KEY INVALID !`)
    }
  } catch (e) {
    global.sendReport(e)
  }
}

// !upwork subscribe {TOPIC}
