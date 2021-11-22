const { Telegraf } = require('telegraf')
const route = use('@Route/Telegram')

if (process.env?.TELEGRAM_BOT_TOKEN?.length) {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
  global.telegramClient = bot.telegram

  bot.on('text', route)

  bot.launch()
}
