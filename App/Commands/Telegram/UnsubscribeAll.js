const Subscribe = use('@Model/Subscribe')
const User = use('@Model/User')
const Channel = use('@Model/Channel')

module.exports = async ctx => {
  try {
    const user = await User.findOne({ userId: ctx.message.from.id })
    const channel = await Channel.findOne({ channelId: ctx.message.chat.id, user: user?._id })

    if (user && channel) {
      await Subscribe.deleteMany({ user: user?._id, channel: channel?._id })
    } else {
      ctx.reply(`YOU NEED TO ADD RSS TOKEN BEFORE SUBSCRIBE OR UNSUBSCRIBE TOPIC`)
    }
  } catch (e) {
    global.sendReport(e)
    ctx.reply(e.message || 'Error on adding new subscribe key')
  }
}
