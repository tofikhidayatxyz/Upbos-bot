const redisClient = use('@Driver/Redis')
const moment = use('moment-timezone')
const Subscribe = use('@Model/Subscribe')
const { requestRSSQueue } = use('@Job/FetchRSS')

module.exports = async () => {
  const runFetch = async () => {
    try {
      const subscribes = await Subscribe.find({}).populate('channel').populate('user')
      if (subscribes?.length) {
        const subscribedFiltered = subscribes?.reduce(
          (acc = [], cp) => (!acc.find(a => a.key === cp.key) ? [...acc, cp] : acc),
          []
        )

        subscribedFiltered.forEach(itm => {
          requestRSSQueue.add(itm)
        })
      } else {
        console.log('NO DATA')
      }
    } catch (err) {
      global.sendReport(err)
    }

    const poolsChannel = Array.from(discordClient.channels.cache.values()).find(
      ch => ch.name === process.env.DISCORD_CHANNEL_POOLS
    )
    if (poolsChannel?.id) {
      const poolCh = discordClient.channels.cache.get(poolsChannel.id)
      redisClient.get('pools', (err, res) => {
        const poolLong = parseInt(res || 0) + 1
        poolCh.send(`Pool ${poolLong} at ${moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm')}`)
        redisClient.set('pools', poolLong)
      })
    }
  }
  setInterval(runFetch, process.env.POLL_TIMEOUT * 1000)
  runFetch()
  global.rssReady = true
}

//
