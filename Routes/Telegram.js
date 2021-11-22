const StartCommand = use('@Command/Telegram/Start')
const InfoCommand = use('@Command/Telegram/Info')
const AddRSS = use('@Command/Telegram/AddToken')
const Subscribed = use('@Command/Telegram/Subscribed')
const Subscribe = use('@Command/Telegram/Subscribe')
const UnSubscribe = use('@Command/Telegram/Unsubscribe')
const RemoveToken = use('@Command/Telegram/RemoveToken')
const UnsubscribeAll = use('@Command/Telegram/UnsubscribeAll')
const Tutorial = use('@Command/Telegram/Tutorial')

module.exports = ctx => {
  if (ctx.message.text.includes('/start')) {
    return StartCommand(ctx)
  } else if (ctx.message.text.includes('/info')) {
    return InfoCommand(ctx)
  } else if (ctx.message.text.includes('/add-rss')) {
    return AddRSS(ctx, ctx.message.text.split('/add-rss').join(''))
  } else if (ctx.message.text.includes('/subscribed')) {
    return Subscribed(ctx)
  } else if (ctx.message.text.includes('/unsubscribe-all')) {
    return UnsubscribeAll(ctx)
  } else if (ctx.message.text.includes('/unsubscribe')) {
    return UnSubscribe(ctx, ctx.message.text.split('/unsubscribe').join(''))
  } else if (ctx.message.text.includes('/subscribe')) {
    return Subscribe(ctx, ctx.message.text.split('/subscribe').join(''))
  } else if (ctx.message.text.includes('/remove-rss')) {
    return RemoveToken(ctx)
  } else if (ctx.message.text.includes('/tutorial')) {
    return Tutorial(ctx)
  }
}

Tutorial
