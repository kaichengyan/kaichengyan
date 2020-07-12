const fs = require('fs');
const GhostContentAPI = require('@tryghost/content-api');
const moment = require('moment');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_CONTENT_KEY,
  version: 'v3'
})

api.posts
    .browse({ limit: 5, include: 'title,url,created_at' })
    .then((posts) => {
      const listItems = posts.map((post) => {
        const dateStr = moment(post.created_at).format('LL')
        return `* [${post.title}](${post.url}) (${dateStr})\n`
      })
      const listMd = ''.concat(...listItems)
      const base = fs.readFileSync('README_BASE.md').toString()
      fs.writeFileSync('README.md',
          base + '\n### My recent blog posts\n\n' + listMd)
    })
    .catch((err) => {
      console.error(err)
    })
