const fs = require('fs')
const ghost = require('./ghost')

async function buildReadMe() {
  let headerSection = fs.readFileSync('README_BASE.md')
  let ghostSection = await ghost()
  const readMeContent = [headerSection, ghostSection].join('\n')
  return readMeContent;
}

buildReadMe()
  .then((content) => {
    console.log(content)
    fs.writeFileSync('README.md', content)
  })
  .catch((err) => console.log(err))
