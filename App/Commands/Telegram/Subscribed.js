const Subscribe = use('@Model/Subscribe')
const User = use('@Model/User')
const Channel = use('@Model/Channel')
const _ = use('lodash')

module.exports = async ctx => {
  try {
    const user = await User.findOne({ userId: ctx.message.from.id })
    const channel = await Channel.findOne({ channelId: ctx.message.chat.id, user: user?.id })
    if (user && channel) {
      const subscribedChannel = await Subscribe.find({ user: user?._id, channel: channel?._id })
      if (subscribedChannel.length) {
        ctx.reply(`Subscribed Topics : ${subscribedChannel.map(itm => _.startCase(itm.key)).join(', ')}`)
      } else {
        ctx.reply('YOU DONT HAVE ANY SUBSCRIBE TOPIC')
      }
    } else {
      ctx.reply(`YOU NEED TO ADD RSS TOKEN BEFORE SUBSCRIBE OR UNSUBSCRIBE TOPIC`)
    }
  } catch (e) {
    global.sendReport(e)
    ctx.reply(e.message || 'Error on adding new subscribe key')
  }
}

// !upwork subscribed
