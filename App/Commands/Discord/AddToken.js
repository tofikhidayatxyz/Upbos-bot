const { normalizeText } = use('normalize-text')
const queryString = use('query-string')
const User = use('@Model/User')
const Channel = use('@Model/Channel')
const subscribe = use('@Command/Discord/Subscribe')

module.exports = async (msg, text) => {
  const query = queryString.parse(text.split('?').pop())

  if (query?.userUid?.length && query?.orgUid?.length) {
    try {
      const createdUser = await User.updateOrCreateOne(
        {
          userId: msg.author.id,
        },
        { userId: msg.author.id, username: msg.author.username, active: true, type: 'discord' }
      )

      await Channel.updateOrCreateOne(
        { channelId: msg.channel.id, user: createdUser?._id },
        {
          channelId: msg.channel.id,
          channelName: msg.channel.name,
          securityToken: query?.securityToken,
          userUid: query?.userUid,
          orgUid: query?.orgUid,
          user: createdUser,
          type: 'discord',
        }
      )

      msg.reply(`RSS added for channel ${msg.channel.name}`)

      if (query.q?.length) {
        subscribe(msg, query.q)
      }
    } catch (err) {
      global.sendReport(err)
      msg.reply(err.message || 'Error while saving rss')
    }
  } else {
    msg.reply(`RSS INVALID !`)
  }
}

// !upwork add-rss url
