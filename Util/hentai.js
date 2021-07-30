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
      collector.on('collect', async (r, u) => {
        if (r.emoji.name == '⬅️' && currentReact-1 >= 0) currentReact -= 1
        if (r.emoji.name == '➡️' && currentReact+1 <= doujin.pages.length) currentReact += 1
        if (r.emoji.name == '❌') { await pesan.delete(); await collector.stop(); reject() }
        pesan = new MessageEmbed()
                .setTitle(doujin.titles.pretty)
                .setColor('GREEN')
                .setImage(doujin.pages[currentReact].url)
        await pesan.edit({content: 'selamat membaca ||dan ingat dosa||', embed})
      })
      
      collector.on('end', async () => {
        await pesan.edit({content: '*pesan ini telah expired.*', embed})
        fullfill()
      })
      
    })
  }
 
  getSearch(query, message) {
    return new Promise(async (fullfill, reject) => {
      let doujinList = await this.client.hentai.search(query)
      
      if (!doujinList) reject('ga ada judul begitu.')
      
      else if (doujinList.length == 1) {
        this.doujinIndex = 0
        let embed = new MessageEmbed()
        .setTitle(doujinList.doujins[0].titles.pretty)
        .setImage(doujinList.doujins[0].pages[0].url)
        .setFooter(`halaman 1 dari ${doujinList.doujins.pages.length}`)
        this.pesan = message.channel.send({content: 'selamat membaca ||dan ingat dosa||', embed})
  
        }
      
      else {
        let msgCollector = await message.channel.awaitMessages((m) => !isNaN(parseInt(m.content)), {max: 1, errors: ['time']})
        msgCollector.on('collect', m => {this.doujinIndex = parseInt(m.content) + 1 })
        }
      
      })
  }
}

module.exports = nhentai
