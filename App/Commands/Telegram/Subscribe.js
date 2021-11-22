const { normalizeText } = use('normalize-text')
const Subscribe = use('@Model/Subscribe')
const User = use('@Model/User')
const Channel = use('@Model/Channel')
// const SubscribeKey = use('@Model/SubscribeKey')

const MAX_FREE_SUBSCRIBE = parseInt(process.env.APP_FREE_MAX_TOPIC || 3)
const MAX_PREMIUM_SUBSCRIBE = parseInt(process.env.APP_REMIUM_MAX_TOPIC || 10)

module.exports = async (ctx, text) => {
  text = normalizeText(text)
  if (text.length) {
    try {
      const user = await User.findOne({ userId: ctx.message.from.id }).populate('subscribekey')
      const channel = await Channel.findOne({ channelId: ctx.message.chat.id, user: user?._id })

      if (user && channel) {
        const userSubscribedTopic = await Subscribe.find({ user: user })
        if (userSubscribedTopic.length > MAX_PREMIUM_SUBSCRIBE) {
          ctx.reply(
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
          ctx.reply(
            `Successfull subscribe key ${text} for channel ${ctx.message.chat.username || ctx.message.chat.name}`
          )
        }
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
}

// !upwork subscribe {TOPIC}
