const User = use('@Model/User')
const SubscribeKey = use('@Model/SubscribeKey')

module.exports = async (msg, token) => {
  const userId = msg.author.id

  const user = await User.findOne({ userId })

  if (!user) {
    msg.reply('Youre not registered on this server, try to leave and join again')
  } else {
    const subscribeKey = await SubscribeKey.findOne({ token }).populate('user')
    if (!subscribeKey) {
      msg.reply('Invalid Token')
    } else if (subscribeKey?.user?.id) {
      if (subscribeKey?.user?.id === user?.id) {
        msg.reply('Allready enable subscription for your account')
      } else {
        msg.reply('This token is allready used by another member, something wrong ?, Pm the admin')
      }
    } else {
      await SubscribeKey.findOneAndUpdate(
        { token },
        {
          user: user,
        }
      )
      msg.reply('Thankyou for your subscription')
    }
  }

  // const alrleadyRedeem = await SubscribeKey.findOne({})

  // console.log(userId, text)
}

// !upwork redeem {token}
