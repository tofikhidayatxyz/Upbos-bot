const Discord = use('discord.js')
const discordRoute = use('@Route/Discord')
const addMemberEvent = use('@Event/Discord/AddMember')
const removeMemberEvent = use('@Event/Discord/RemoveMember')
const route = use('@Route/Discord')
const rssEvent = use('@Service/RSS')
const client = new Discord.Client()

global.discordClient = null
global.sendReport = () => {}
global.rssReady = false

client.on('message', msg => {
  if (
    msg.content.toLowerCase().includes(`${process.env.DISCORD_BOT_PREFIX}${process.env.DISCORD_BOT_NAME}`.toLowerCase())
  ) {
    return route(
      msg,
      msg.content
        .split(`${process.env.DISCORD_BOT_PREFIX.toLowerCase()}${process.env.DISCORD_BOT_NAME.toLowerCase()}`)
        .join('')
    )
  }
})

client.on('guildMemberAdd', addMemberEvent)

client.on('guildMemberRemove', removeMemberEvent)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  global.discordClient = client
  global?.handleQueueStart?.()
  global.sendReport = text => {
    const reportChannel = Array.from(discordClient.channels.cache.values()).find(
      ch => ch.name === process.env.DISCORD_CHANNEL_REPORT
    )
    const reportCh = discordClient.channels.cache.get(reportChannel.id)
    reportCh.send(text?.message ? `${text.message} \n--- \n${text.stack}` : text)
  }

  global.sendReport('SERVER STARTUP ')

  if (!global.rssReady) {
    rssEvent()
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)
