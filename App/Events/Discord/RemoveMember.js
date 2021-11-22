const User = use('@Model/User')
const ChannelCreator = use('@Model/ChannelCreator')

module.exports = async member => {
  const generalChannel = Array.from(discordClient.channels.cache.values()).find(
    ch => ch.name === process.env.DISCORD_CHANNEL_GENERAL
  )

  const guild = await discordClient.guilds.fetch(member.guild.id)

  const user = await User.findOneAndUpdate({ userId: member.user.id }, { active: false })
  const channelDB = await ChannelCreator.find({ user: user })

  channelDB.forEach(async ch => {
    const userChannel = guild.channels.cache.find(c => c.id == ch.channelId)
    if (userChannel) {
      await userChannel.delete()
    }
    await ChannelCreator.findOneAndDelete({ channelId: ch.channelId })
  })

  const genCh = discordClient.channels.cache.get(generalChannel.id)

  genCh.send(`See you again <@${member.user.id}> We will miss you :smiling_face_with_tear:`)

  global.sendReport(`User ${member.user} is leave, maybe need to remove their channel`)
}
