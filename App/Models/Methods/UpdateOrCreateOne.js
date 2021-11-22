module.exports = model => {
  return (model.statics.updateOrCreateOne = async function (key, query, callback) {
    const ref = await this.findOne(key)
    if (ref) {
      await this.updateOne(key, query)
      return { ...ref.toObject(), _update: true }
    } else {
      return await this.create(query)
    }
  })
}

// !upbos add-rss https://www.upwork.com/ab/feed/jobs/rss?q=jekyll&sort=recency&paging=0%3B50&api_params=1&securityToken=bb8f8fbe3a30771527d492afc10c9f4decffec8df342591e4a8a836b722e1098bb2245ba7dd6d5fa105991fef8b75135681696b16a293f7d4d618425e38447f4&userUid=1005593180710002688&orgUid=1005593180718391297
