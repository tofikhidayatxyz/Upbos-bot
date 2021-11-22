const queryString = use('query-string')
const User = use('@Model/User')
const Channel = use('@Model/Channel')
const unSubscribeAll = use('@Command/Telegram/UnsubscribeAll')

module.exports = async ctx => {
  try {
    const createdUser = await User.updateOrCreateOne(
      {
        userId: ctx.message.from.id,
      },
      { userId: ctx.message.from.id, username: ctx.message.from.username }
    )

    await unSubscribeAll(ctx)

    await Channel.findOneAndDelete({ channelId: ctx.message.chat.id, user: createdUser?._id })

    ctx.reply(`RSS removed for channel ${ctx.message.chat.username || ctx.message.chat.name}`)
  } catch (err) {
    global.sendReport(err)
    ctx.reply(err.message || 'Error while saving rss')
  }
}

// !upwork add-rss url
