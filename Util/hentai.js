const { MessageEmbed } = require('discord.js')

class nhentai {
  constructor(client) {
    this.client = client
  }
  getCode(code, message) {
    return new Promise(async (fullfill, reject) => {
      let doujin = await this.client.hentai.fetchDoujin(code)
      
      if (!doujin) {
        reject('ga ada kode begitu.')
      }
      
      let currentReact = 0
      
      //pesan doujinnya
      let embed = new MessageEmbed()
      .setTitle(doujin.titles.pretty)
      .setColor('GREEN')
      .setImage(doujin.pages[currentReact].url)
      
      let pesan = message.channel.send({content: 'selamat membaca ||dan ingat dosa||', embed})
      let filter = (reaction, user) => {
            let abcd = reaction.emoji.name == '➡️' ? 1 : reaction.emoji.name == '⬅️' ? 1 : reaction.emoji.name == '❌' ? 1 : 0
            let efgh = user.id == message.author.id ? 1 : 0
            if (abcd == 1 && efgh == 1) return true
            return false
          }
           
      let collector = pesan.createReactionCollector(filter, {time: 1000 * 900})
      
      //reaction buat baca
      await pesan.react('❌')
      await pesan.react('⬅️')
      await pesan.react('➡️')
      
      //lagi baca doujin
      collector.on('collect', (r, u) => {
        if (r.emoji.name == '⬅️' && currentReact-1 >= 1) currentReact -= 1
        if (r.emoji.name == '➡️' && currentReact+1 <= doujin.pages.length) currentReact += 1
        if (r.emoji.name == '❌') { await r.message.delete(); await collector.stop(); reject() }
        
        await pesan.edit({content: 'selamat membaca ||dan ingat dosa||', embed})
      })
      
      collector.on('end', () => {
        await pesan.edit({content: '*pesan ini telah expired.*', embed})
        fullfill()
      })
      
    })
  }
 
  getSearch(query, message) {
    console.log('a')
  }
}
