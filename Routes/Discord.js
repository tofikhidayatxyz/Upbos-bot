const User = use('@Model/User')
const ChannelCreator = use('@Model/ChannelCreator.js')
const addToken = use('@Command/Discord/AddToken')
const removeToken = use('@Command/Discord/RemoveToken')
const subscribe = use('@Command/Discord/Subscribe')
const unsubscribe = use('@Command/Discord/Unsubscribe')
const unsubscribeAll = use('@Command/Discord/UnsubscribeAll')
const info = use('@Command/Discord/Info')
const subscribed = use('@Command/Discord/Subscribed')
const redeem = use('@Command/Discord/Redeem')
const tutorial = use('@Command/Discord/Tutorial')
const Notify = use('@Command/Discord/Notify')

module.exports = async (msg, text) => {
  if (!msg.author.bot) {
    // validate is your channel

    const user = await User.findOne({ userId: msg.author.id }).populate('subscribekey')
    const userChannel = await ChannelCreator.findOne({ channelId: msg.channel.id, user: user?._id })

    if (text.includes('notify') && !!msg.member.roles.cache.find(r => r.name === 'Admin')) {
      return Notify(msg, text.split('notify ').join(''))
    }

    // run
    if (user && userChannel && msg?.channel?.name === userChannel?.channelName) {
      if (text.includes('info')) {
        return info(msg)
      } else if (text.includes('subscribed')) {
        return subscribed(msg)
      } else if (text.includes('add-rss')) {
        return addToken(msg, text.split('add-rss ').join(''))
      } else if (text.includes('unsubscribe-all')) {
        return unsubscribeAll(msg, text.split('unsubscribe-all ').join(''))
      } else if (text.includes('unsubscribe')) {
        return unsubscribe(msg, text.split('unsubscribe ').join(''))
      } else if (text.includes('subscribe')) {
        return subscribe(msg, text.split('subscribe ').join(''))
      } else if (text.includes('remove-rss')) {
        return removeToken(msg, text.split(' remove-rss').join(''))
      } else if (text.includes('redeem')) {
        return redeem(msg, text.split(' redeem').join('').split(' ').join(''))
      } else if (text.includes('tutorial')) {
        return tutorial(msg)
      } else {
        msg.reply('No Command Found')
      }
    } else {
      if (text.includes('info')) {
        return info(msg)
      } else if (text.includes('tutorial')) {
        return tutorial(msg)
      } else {
        msg.reply(`You can only send your specific command on your private channel, ${userChannel?.channelName || ''}`)
      }
    }
  }
}
