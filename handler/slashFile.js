const fs = require('fs')
const { SlashCommand } = require('../Util/SlashCommand.js')
module.exports = client => {
  client.slash = new SlashCommand(client)
  
  let mainFolder = fs.readdirSync('./commands/');
  for (const folder of mainFolder) {
    const files = fs.readdirSync(`./commands/${folder}/`)
    for (const file of files) {
      const command = require(`../commands/${folder}/${file}`)
      client.slash.addCommand(command)
    }
  }
}
