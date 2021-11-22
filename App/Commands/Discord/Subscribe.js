const { normalizeText } = use('normalize-text')
const Subscribe = use('@Model/Subscribe')
const User = use('@Model/User')
const Channel = use('@Model/Channel')
const SubscribeKey = use('@Model/SubscribeKey')

const MAX_FREE_SUBSCRIBE = parseInt(process.env.APP_FREE_MAX_TOPIC || 3)
const MAX_PREMIUM_SUBSCRIBE = parseInt(process.env.APP_REMIUM_MAX_TOPIC || 10)

module.exports = async (msg, text) => {
  text = normalizeText(text)
  if (text.length) {
    try {
      const user = await User.findOne({ userId: msg.author.id }).populate('subscribekey')
      const channel = await Channel.findOne({ channelId: msg.channel.id, user: user?._id })

      if (user && channel) {
        const userSubscribedTopic = await Subscribe.find({ user: user })
        if (userSubscribedTopic.length > MAX_PREMIUM_SUBSCRIBE) {
          msg.reply(
            `You cant add more susbcribe topic because you have reached the limit, max limit is ${MAX_PREMIUM_SUBSCRIBE}`
          )
        } else {
          await Subscribe.updateOrCreateOne(
            { user: user?._id, channel: channel?._id, key: text.toLowerCase() },
            {
              user: user?._id,
              channel: channel?._id,
              key: text,
            }
          )
          msg.reply(`Successfull subscribe key ${text} for channel ${msg.channel.name}`)
        }
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
