const moment = use('moment-timezone')
const sanitizer = use('@Module/TextSanitizer')
const rssParser = use('rss-parser')
const Discord = use('discord.js')
const Queue = use('bull')
const Subscribe = use('@Model/Subscribe')

const RSSParser = new rssParser()

const requestRSSQueue = new Queue('Request RSS Queue', {
  redis: {
    port: 6379,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_QUEUE_DB_RSS,
  },
})

// pause all queue
requestRSSQueue.pause()

// send to discord
const sendDiscordMessage = ({ channel, user, data, key, message }) => {
  try {
    const discordCh = discordClient.channels.cache.get(channel?.channelId)
    if (!message) {
      if (discordCh) {
        data.forEach(itm => {
          const skills = itm.content
            ?.split('<b>Skills</b>:')
            .pop()
            .split('\n')[0]
            .split(',')
            .map(itm => itm.replace(/\s+/g, ' ').trim())
          const hourly = itm.content
            .split('<b>Hourly Range</b>:')
            .pop()
            .split('\n')[0]
            .split('<br />')[0]
            .replace(/\s+/g, ' ')
            .trim()
          const budget = itm.content
            .split('<b>Budget</b>:')
            .pop()
            .split('\n')[0]
            .split('<br />')[0]
            .replace(/\s+/g, ' ')
            .trim()
          const country = itm.content
            .split('<b>Country</b>:')
            .pop()
            .split('\n')[0]
            .split('<br />')[0]
            .replace(/\s+/g, ' ')
            .trim()
          const category = itm.content
            .split('<b>Category</b>:')
            .pop()
            .split('\n')[0]
            .split('<br />')[0]
            .replace(/\s+/g, ' ')
            .trim()

          discordCh.send(`HI <@${user.userId || '-'}>, We found job for your from keyword "${key || '-'}"`)
          const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(itm.title || '-')
            .setAuthor(
              process.env.DISCORD_BOT_NAME,
              'http://upbos.static.beta.helllo.me/images/logo.png',
              itm.link || '-'
            )
            .setURL(itm.link || '-')
            .setDescription(`${sanitizer(itm.content || '-').substr(0, 700)} ...`)
            .addFields(
              { name: 'Time UTC', value: moment(itm.pubDate).tz('utc').format('YYYY-MM-DD HH:mm') || '-' },
              { name: 'When', value: moment(itm.pubDate).fromNow() || '-' },
              { name: 'Country', value: country || '-' },
              { name: 'Category', value: category || '-' },
              { name: 'Skills', value: Array.isArray(skills) ? skills.join(', ') : '-' },
              { name: 'Budget', value: budget?.length < 15 ? budget : '-' },
              { name: 'Country', value: country?.length < 50 ? country : '-' },
              { name: 'Hourly', value: hourly?.length < 20 ? hourly : '-' },
              { name: 'Link', value: itm.link || '-' },
              { name: 'Saweria', value: 'https://saweria.co/tofikhidayatxyz' },
              { name: 'Ko-Fi', value: 'https://ko-fi.com/tofikhidayatxyz' },
              {
                name: '_',
                value: `Made with love by [Tofik Hidayat](https://web.facebook.com/tofikhidayat.xyz) Powered By [Syntac](https://syntac.co/)`,
              }
            )
            .setTimestamp()
          discordCh.send(embed)
        })
      }
    } else {
      if (discordCh) {
        discordCh.send(message)
      }
    }
  } catch (e) {
    global.sendReport(e)
    console.log(e)
  }
}

const sendTelegramMessage = ({ channel, user, key, data, message }) => {
  try {
    // console.log(data)
    if (!message) {
      data.forEach(itm => {
        const skills = itm.content
          ?.split('<b>Skills</b>:')
          .pop()
          .split('\n')[0]
          .split(',')
          .map(itm => itm.replace(/\s+/g, ' ').trim())
        const hourly = itm.content
          .split('<b>Hourly Range</b>:')
          .pop()
          .split('\n')[0]
          .split('<br />')[0]
          .replace(/\s+/g, ' ')
          .trim()
        const budget = itm.content
          .split('<b>Budget</b>:')
          .pop()
          .split('\n')[0]
          .split('<br />')[0]
          .replace(/\s+/g, ' ')
          .trim()
        const country = itm.content
          .split('<b>Country</b>:')
          .pop()
          .split('\n')[0]
          .split('<br />')[0]
          .replace(/\s+/g, ' ')
          .trim()
        const category = itm.content
          .split('<b>Category</b>:')
          .pop()
          .split('\n')[0]
          .split('<br />')[0]
          .replace(/\s+/g, ' ')
          .trim()

        const text = `
Hi we found new job from keyword "${key}"\n
[${itm.title}](${itm.link}) \n
${sanitizer(itm.content).substr(0, 700)} ...\n
*Time UTC :*
${moment(itm.pubDate).tz('utc').format('YYYY-MM-DD HH:mm') || '-'}\n
*When : *
${moment(itm.pubDate).fromNow() || '-'}\n
*Country : *
${country || '-'}\n
*Category : *
${category || '-'}\n
*Skills : *
${Array.isArray(skills) ? skills.join(', ') : '-'}\n
*Budget : *
${budget?.length < 15 ? budget : '-'}\n
*Hourly :*
${hourly?.length < 20 ? hourly : '-'}\n
*Link :*
[${itm.link || '-'}]($${itm.link || '-'})\n
*Saweria : *
https://saweria.co/tofikhidayatxyz\n
*Ko-Fi :*
https://ko-fi.com/tofikhidayatxyz\n
Made with love by [Tofik Hidayat](https://web.facebook.com/tofikhidayat.xyz) Powered By [Syntac](https://syntac.co/)
`

        telegramClient
          .sendMessage(user.userId, text, {
            parse_mode: 'markdown',
          })
          .catch(console.log)

        //.catch(global.sendReport)
      })
    } else {
      telegramClient
        .sendMessage(user.userId, message, {
          parse_mode: 'markdown',
        })
        .catch(console.log)

      //.catch(global.sendReport)
    }
  } catch (e) {
    global.sendReport(e)
  }
}

requestRSSQueue.process(async (job, done) => {
  const { key, channel, user } = job.data
  try {
    if (channel?.securityToken?.length && channel?.userUid && channel?.orgUid) {
      const url = `https://www.upwork.com/ab/feed/jobs/rss?q=${key}&sort=recency&paging=0%3B50&api_params=1&securityToken=${channel.securityToken}&userUid=${channel.userUid}&orgUid=${channel.orgUid}`
      const results = await RSSParser.parseURL(url)
      const data = results?.items
        .filter(cnt => moment().diff(moment(cnt.pubDate), 'seconds') <= process.env.POOL_RANGE)
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        ?.splice(0, 5)

      const syncSubDb = await Subscribe.find({ key: key }).populate('channel').populate('user')
      syncSubDb.forEach(sub => {
        if (sub?.channel?.type === 'telegram') {
          if (process.env?.TELEGRAM_BOT_TOKEN?.length) {
            sendTelegramMessage({ channel: sub.channel, user: sub.user, key: sub.key, data: data })
          }
        } else {
          sendDiscordMessage({ channel: sub.channel, user: sub.user, key: sub.key, data: data })
        }
      })
    } else {
      if (channel?.type === 'telegram') {
        if (process.env?.TELEGRAM_BOT_TOKEN?.length) {
          sendTelegramMessage({
            channel: channel,
            user: user,
            message: 'YOUR RSS IS INVALID PLEASE ADD NEW RSS',
          })
        }
      } else {
        sendDiscordMessage({ channel: channel, user: user, message: 'YOUR RSS IS INVALID PLEASE ADD NEW RSS' })
      }
    }

    done()
  } catch (err) {
    global.sendReport(err)
    console.log(key, channel, user)
    global.sendReport(`Payload ${JSON.stringify(key)} || ${JSON.stringify(channel)} || ${JSON.stringify(user)}`)
    console.warn(err)
    done()
  }
})

global.handleQueueStart = () => {
  console.log('Queue startted')
  requestRSSQueue.resume()
}

module.exports = {
  requestRSSQueue,
}

//673242543653531649
// user 673242543649337344
