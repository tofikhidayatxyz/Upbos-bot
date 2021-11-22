const Channel = use('@Model/Channel')
const ChannelCreator = use('@Model/ChannelCreator')

module.exports = async (msg, text) => {
  const channels = await Channel.find({})
  const channelCreators = await ChannelCreator.find({})

  channels.forEach(ch => {
    try {
      if (ch.type === 'telegram') {
        telegramClient.sendMessage(ch.channelId, text, {
          parse_mode: 'markdown',
        })
      }
    } catch (e) {
      global.sendReport(e)
    }
  })

  channelCreators.forEach(ch => {
    try {
      const userChannel = discordClient.channels.cache.get(ch.channelId)
      if (userChannel) {
        userChannel.send(text)
      }
    } catch (e) {
      global.sendReport(e)
    }
  })
}
