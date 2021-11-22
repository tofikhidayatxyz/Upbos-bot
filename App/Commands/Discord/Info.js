const Discord = use('discord.js')

module.exports = msg => {
  const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help And Information')
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
        name: `1. ${process.env.DISCORD_BOT_PREFIX.toLowerCase()}${process.env.DISCORD_BOT_NAME.toLowerCase()} info`,
        value: 'Help and information',
      },
      {
        name: `2. ${process.env.DISCORD_BOT_PREFIX.toLowerCase()}${process.env.DISCORD_BOT_NAME.toLowerCase()} add-rss RSS_URL`,
        value: 'Register RSS URL , Tutorial: http://upbosdocv1.helllo.me/introduction/find-rss .',
      },
      {
        name: `3. ${process.env.DISCORD_BOT_PREFIX.toLowerCase()}${process.env.DISCORD_BOT_NAME.toLowerCase()} remove-rss`,
        value: 'Remove RSS',
      },
      {
        name: `4. ${process.env.DISCORD_BOT_PREFIX.toLowerCase()}${process.env.DISCORD_BOT_NAME.toLowerCase()} subscribe TOPIC`,
        value: 'Subscribe some jon topic, Example: design, laravel, etc.',
      },

      {
        name: `5. ${process.env.DISCORD_BOT_PREFIX.toLowerCase()}${process.env.DISCORD_BOT_NAME.toLowerCase()} unsubscribe TOPIC`,
        value: 'Unsubscribe topic',
      },
      {
        name: `6. ${process.env.DISCORD_BOT_PREFIX.toLowerCase()}${process.env.DISCORD_BOT_NAME.toLowerCase()} subscribed`,
        value: 'List of subscribed topics.',
      },
      {
        name: `7. ${process.env.DISCORD_BOT_PREFIX.toLowerCase()}${process.env.DISCORD_BOT_NAME.toLowerCase()} unsubscribe-all`,
        value: 'Unsubscribe all topics.',
      },
      {
        name: `8. ${process.env.DISCORD_BOT_PREFIX.toLowerCase()}${process.env.DISCORD_BOT_NAME.toLowerCase()} tutorial`,
        value: 'List of tutorial how to use this bot.',
      },
      {
        name: '_',
        value: `Made with love by [Tofik Hidayat](https://web.facebook.com/tofikhidayat.xyz) Powered By [Syntac](https://syntac.co/)`,
      }
    )
    .setTimestamp()

  msg.reply(embed)
}
