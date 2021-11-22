const User = use('@Model/User')
const ChannelCreator = use('@Model/ChannelCreator')

module.exports = async member => {
  const generalChannel = Array.from(discordClient.channels.cache.values()).find(
    ch => ch.name === process.env.DISCORD_CHANNEL_GENERAL
  )

  const genCh = discordClient.channels.cache.get(generalChannel.id)

  try {
    const guild = await discordClient.guilds.fetch(member.guild.id)
    const upworkerCategory = guild.channels.cache.find(
      c => c.name == process.env.DISCORD_UPWORK_CATEGORY && c.type == 'category'
    )
    const lastChannel = await ChannelCreator.findOne({}, {}, { sort: { createdAt: -1 } }).exec()
    const everyoneRole = guild.roles.everyone
    const channelName = `${member.user.username}-upwork-${
      lastChannel?.index ? lastChannel?.index + 1 : 1
    }`.toLowerCase()

    genCh.send(`Hi <@${member.user.id}> welcome to server
  For more information you can type ${process.env.DISCORD_BOT_PREFIX.toLowerCase()}${process.env.DISCORD_BOT_NAME.toLowerCase()} info,
  We have create your private channel with name "${channelName}" for mannage your upwork subscribe topic
      `)

    const channel = await guild.channels.create(channelName, {
      type: 'text',
      parent: upworkerCategory.id,
      permissionOverwrites: [
        {
          id: member.guild.id,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: everyoneRole.id,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: member.user.id,
          allow: ['VIEW_CHANNEL'],
        },
      ],
    })

    channel.send(
      `Hi <@${
        member.user.id
      }>, This is your private chanbel for mannaging upwork subscibe topic, for more information just send ${process.env.DISCORD_BOT_PREFIX.toLowerCase()}${process.env.DISCORD_BOT_NAME.toLowerCase()} info`
    )

    const createdUser = await User.updateOrCreateOne(
      {
        userId: member.user.id,
      },
      { userId: member.user.id, username: member.user.username, active: true, type: 'discord' }
    )

    await ChannelCreator.updateOrCreateOne(
      { channelId: channel.id, user: createdUser?._id },
      {
        channelId: channel.id,
        channelName: channelName,
        user: createdUser,
        index: lastChannel?.index ? lastChannel?.index + 1 : 1,
      }
    )
  } catch (e) {
    console.log(e)
    global.sendReport(e)
  }
}
