const ms = require('ms')
const { Collection } = require('discord.js')
module.exports = async (client, channel) => {
  let pesan = await channel.send('a card is dropping')
  let first = false
  let second = false
  let third = false
  
  await pesan.react('1️⃣')
  await pesan.react('2️⃣')
  await pesan.react('3️⃣')
  let now = Date.now()
  
  const filter = (r, u) => { 
    let abcd;
    let efgh;
    if (r.emoji.name == '3️⃣' || r.emoji.name == '2️⃣' || r.emoji.name == '1️⃣') abcd = true
    if (u.bot == false) efgh = true
    if (abcd == true && efgh == true) return true
    return false
  }
  
  const firstCollector = await pesan.createReactionCollector({filter: filter, time: 1000 * 60 })
  const secondCollector = await pesan.createReactionCollector({filter: r => r.emoji.name == '2️⃣', time: 1000 * 60 })
  const thirdCollector = await pesan.createReactionCollector({filter: r => r.emoji.name == '3️⃣', time: 1000 * 60 })
  
  let timestamp = new Collection()
  
  firstCollector.on('collect', async (r, u) => {
    timestamp.set(u.id, Date.now())
    setTimeout(() => {
      firstCollector.stop()
    }, 3000)
  })
  
  firstCollector.on('end', c => {
    console.log('Collect: ' + JSON.stringify(c))
    const winner = timestamp.randomKey()
    channel.send(`<@${winner}> got it, it took them blabla`)
  })
}
