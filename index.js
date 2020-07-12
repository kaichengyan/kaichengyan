const fs = require('fs');
const GhostContentAPI = require('@tryghost/content-api')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const api = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_CONTENT_KEY,
  version: 'v3'
})

api.posts
    .browse({ limit: 5, include: 'title,url' })
    .then((posts) => {
      const listItems = posts.map((post) => `* [${post.title}](${post.url})\n`)
      const listMd = ''.concat(...listItems)
      const base = fs.readFileSync('README_BASE.md')
      fs.writeFileSync('README.md', base + '\n')
      fs.appendFileSync('README.md', '### My recent blog posts\n\n')
      fs.appendFileSync('README.md', listMd)
    })
    .catch((err) => {
      console.error(err)
    })
