module.exports = async (client, channel) => {
  let pesan = await channel.send('a card is dropping')
  const first = [() => pesan.react('1️⃣'), false]
  const second = [() => pesan.react('2️⃣'), false]
  const third = [() => pesan.react('3️⃣'), false]
  
  await first[0]()
  await second[0]()
  await third[0]()
  
  let collector = await pesan.createReactionCollector((r) => {
    r.emoji.name == '1️⃣' || r.emoji.name == '2️⃣'  || r.emoji.name == '3️⃣'
  }, {time: 1000 * 60})
  
  collector.on('collect', async (r) => {
    if (r.emoji.name == '1️⃣' && first[1] == false) {
      setTimeout(() => {
        let people = r.users.fetch()
        first[1] == true
        return channel.send('<@' + people[Math.floor(Math.random() * r.count)] + '>, u got the weapon!!')
      }, 3000)
    }
    
    if (r.emoji.name == '2️⃣' && second[1] == false) {
      setTimeout(() => {
        let people = r.users.fetch()
        second[1] == false
        return channel.send('<@' + people[Math.floor(Math.random() * r.count)] + '>, u got the weapon!!')
      }, 3000)
    }
    
    if (r.emoji.name == '3️⃣' && third[1] == false) {
      setTimeout(() => {
        let people = r.users.fetch()
        third[1] == false
        return channel.send('<@' + people[Math.floor(Math.random() * r.count)] + '>, u got the weapon!!')
      }, 3000)
    }    
  })
  
  collector.on('end', async () => {
    await pesan.edit('pesan ini telah expired.')
  })
}
