module.exports = (ctx, text) => {
  try {
    ctx.reply(`
Hello
My name is ${process.env.DISCORD_BOT_NAME}
I will help you for doing your work with upwork
I will message you when have new job that suit you
For more information just send /info
    `)
  } catch (e) {
    console.log(e)
  }
}

//   telegramClient.sendMessage(ctx.message.chat.id, 'PT')
