const Discord = use('discord.js')

module.exports = msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Tutorials')
    .setAuthor(
      process.env.DISCORD_BOT_NAME,
      'http://upbos.static.beta.helllo.me/images/logo.png',
      'https://discord.gg/TGSSSeQp8m'
    )
    .setDescription(
      'Upbos is bot for helping upworkers with update notification when the job related with upworker updated.'
    )
    .addFields(
      {
        name: `1. Introduction`,
        value: 'http://upbosdocv1.helllo.me/introduction',
      },
      {
        name: `2. How to register RSS`,
        value: 'http://upbosdocv1.helllo.me/find-rss',
      }
    )
    .setTimestamp()

  msg.reply(embed)
}
