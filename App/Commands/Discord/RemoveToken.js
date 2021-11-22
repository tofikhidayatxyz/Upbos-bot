const queryString = use('query-string')
const User = use('@Model/User')
const Channel = use('@Model/Channel')
const unSubscribeAll = use('@Command/Discord/UnsubscribeAll')

module.exports = async msg => {
  try {
    const createdUser = await User.updateOrCreateOne(
      {
        userId: msg.author.id,
      },
      { userId: msg.author.id, username: msg.author.username }
    )

    await unSubscribeAll(msg)

    await Channel.findOneAndDelete({ channelId: msg.channel.id, user: createdUser?._id })

    msg.reply(`RSS removed for channel ${msg.channel.name}`)
  } catch (err) {
    global.sendReport(err)
    msg.reply(err.message || 'Error while saving rss')
  }
}

// !upwork add-rss url
