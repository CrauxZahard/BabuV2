const ms = require('ms')
const { Collection } = require('discord.js')
module.exports = async (client, channel) => {
  let pesan = await channel.send('a card is dropping')
  let filter = (r, u) => {
    if (r.emoji.toString() == '1️⃣' || r.emoji.toString() == '2️⃣' || r.emoji.toString() == '3️⃣') { return true }
    return false
  }
  
  await pesan.react('1️⃣')
  await pesan.react('2️⃣')
  await pesan.react('3️⃣')
  
  let timestamp = new Collection()
  let collector = pesan.cretaeReactionCollector({filter, time: 1000 * 10})
  
  collector.on('collect', (r, u) => {
    timestamp.set(u.id, Date.now())
    collector.stop()
  })
  
  collector.on('end', c => {
    console.log(JSON.stringify(c))
    channel.send(`Done, size: ${c.size}`)
  })
}
