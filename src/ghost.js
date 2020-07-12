const GhostContentAPI = require('@tryghost/content-api');
const moment = require('moment');

const header = '### My recent blog posts'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_CONTENT_KEY,
  version: 'v3'
})

module.exports = async function getRecentPosts() {
  const posts = await api.posts.browse({
    limit: 5,
    include: 'title,url,created_at'
  })
  const listItems = posts.map((post) => {
    const dateStr = moment(post.created_at).format('LL')
    return `* [${post.title}](${post.url}) (${dateStr})`
  })
  const listMd = listItems.join('\n')
  return header + '\n\n' + listMd + '\n';
}
