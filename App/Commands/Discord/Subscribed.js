const Subscribe = use('@Model/Subscribe')
const User = use('@Model/User')
const Channel = use('@Model/Channel')
const _ = use('lodash')

module.exports = async msg => {
  try {
    const user = await User.findOne({ userId: msg.author.id })
    const channel = await Channel.findOne({ channelId: msg.channel.id, user: user?.id })
    if (user && channel) {
      const subscribedChannel = await Subscribe.find({ user: user?._id, channel: channel?._id })
      if (subscribedChannel.length) {
        msg.reply(`Subscribed Topics : ${subscribedChannel.map(itm => _.startCase(itm.key)).join(', ')}`)
      } else {
        msg.reply('YOU DONT HAVE ANY SUBSCRIBE TOPIC')
      }
    } else {
      msg.reply(`YOU NEED TO ADD RSS TOKEN BEFORE SUBSCRIBE OR UNSUBSCRIBE TOPIC`)
    }
  } catch (e) {
    global.sendReport(e)
    msg.reply(e.message || 'Error on adding new subscribe key')
  }
}

// !upwork subscribed
