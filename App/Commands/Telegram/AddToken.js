const { normalizeText } = use('normalize-text')
const queryString = use('query-string')
const User = use('@Model/User')
const Channel = use('@Model/Channel')
const subscribe = use('@Command/Telegram/Subscribe')

module.exports = async (ctx, text) => {
  const query = queryString.parse(text.split('?').pop())

  if (query?.userUid?.length && query?.orgUid?.length) {
    try {
      const createdUser = await User.updateOrCreateOne(
        {
          userId: ctx.message.from.id,
        },
        { userId: ctx.message.from.id, username: ctx.message.from.username, active: true, type: 'telegram' }
      )

      await Channel.updateOrCreateOne(
        { channelId: ctx.message.chat.id, user: createdUser?._id },
        {
          channelId: ctx.message.chat.id,
          channelName: ctx.message.chat.username || ctx.message.chat.name,
          securityToken: query?.securityToken,
          userUid: query?.userUid,
          orgUid: query?.orgUid,
          user: createdUser,
          type: 'telegram',
        }
      )

      if (query.q?.length) {
        subscribe(ctx, query.q)
      }

      ctx.reply(`RSS added for channel ${ctx.message.chat.username || ctx.message.chat.name}`)
    } catch (err) {
      global.sendReport(err)
      ctx.reply(err.message || 'Error while saving rss')
    }
  } else {
    ctx.reply(`RSS INVALID !`)
  }
}

// !upwork add-rss url
