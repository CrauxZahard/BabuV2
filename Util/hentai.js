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
        embed = new MessageEmbed()
                .setTitle(doujin.titles.pretty)
                .setColor('GREEN')
                .setImage(doujin.pages[currentReact].url)
                .setFooter(`Halaman ke ${currentReact+1} dari ${doujin.pages.length}`)
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
    doujinList = doujinList.doujins
      
    let filter = (reaction, user) => {
            let abcd = reaction.emoji.name == '➡️' ? 1 : reaction.emoji.name == '⬅️' ? 1 : reaction.emoji.name == '❌' ? 1 : 0
            let efgh = user.id == message.author.id ? 1 : 0
            if (abcd == 1 && efgh == 1) return true
            return false
          }
    let currentReact = 0
    
    if (!doujinList) {
      //no result
      message.channel.send('ga ada judul begitu')
      reject()
    }
      
      else if (doujinList.length == 1) {
        //1 result
        let embed = new MessageEmbed()
        .setTitle(doujinList[0].titles.pretty)
        .setImage(doujinList[0].pages[0].url)
        .setFooter(`halaman 1 dari ${doujinList[0].pages.length}`)
        let pesan = await message.channel.send({content: 'selamat membaca ||dan ingat  dosa||', embed})
        
        //reaction baca
        await pesan.react('❌')
        await pesan.react('⬅️')
        await pesan.react('➡️')
        
        let collector = pesan.createReactionCollector(filter, {time: 1000 * 900})
        
        collector.on('collect', async (r, u) => {
        if (r.emoji.name == '⬅️' && currentReact-1 >= 0) currentReact -= 1
        if (r.emoji.name == '➡️' && currentReact+1 <= doujinList[0].pages.length) currentReact += 1
        if (r.emoji.name == '❌') { await pesan.delete(); await collector.stop(); reject() }
        embed = new MessageEmbed()
                .setTitle(doujinList[0].titles.pretty)
                .setColor('GREEN')
                .setImage(doujinList[0].pages[currentReact].url)
                .setFooter(`Halaman ke ${currentReact+1} dari ${doujinList[0].pages.length}`)
        await pesan.edit({content: 'selamat membaca ||dan ingat dosa||', embed})
        })
        
        collector.on('end', async () => {
          await pesan.edit({content: '*pesan ini telah expired.*', embed})
          fullfill()
        })
      }
      
      else {
        //multiple result
        let tempReact = 0
        let embed = new MessageEmbed()
        .setTitle(doujinList[tempReact].titles.pretty)
        .setImage(doujinList[tempReact].cover.url)
        .setDescription(`Tags: ${doujinList[tempReact].tags.all.map(x =>  x.name).join(', ')}`)
        .setColor('GREEN')
        let idk = doujinList.map((d, i) => `${i+1}.) ${d.titles.pretty}`).join('\n').split(`${tempReact+1}.)`).join(`\n--> ${currentReact+1}.) `)
        let pesan = await message.channel.send({content: 'pilih angka atau react yang mau dibaca:\n' + idk, embed})
        
        //reaction sementara buat pilih doujin
        await pesan.react('❌')
        await pesan.react('⬆️')
        await pesan.react('⬇️')
        await pesan.react('✅')
        
        let filter2 = (reaction, user) => {
            let abcd = reaction.emoji.name == '⬆️' ? 1 : reaction.emoji.name == '⬇️' ? 1 : reaction.emoji.name == '❌' ? 1 : reaction.emoji.name == '✅' ? 1 : 0
            let efgh = user.id == message.author.id ? 1 : 0
            if (abcd == 1 && efgh == 1) return true
            return false
          }
        
        let tempCollector = await pesan.createReactionCollector(filter2, {time: 1000 * 900})
        let tempAwait = await message.channel.createMessageCollector((m) => !isNaN(parseInt(m.content)) && parseInt(m.content) <= doujinList.length, {
          max: 1,
          time: 1000 * 30
        })
        
        tempCollector.on('collect', async (r, u) => {
          if (r.emoji.name == '⬆️' || r.emoji.name == '⬇️' || r.emoji.name == '❌') {
            if (r.emoji.name == '⬆️' && tempReact >= 1) tempReact -= 1
            if (r.emoji.name == '⬇️' && tempReact <= doujinList.length - 2) tempReact += 1
            if (r.emoji.name == '❌') { await pesan.delete(); await tempCollector.stop(); await tempAwait.stop(); reject() }
            embed = new MessageEmbed()
            .setTitle(doujinList[tempReact].titles.pretty)
            .setDescription(`Tags: ${doujinList[tempReact].tags.all.map(x => x.name).join(', ')}\nFavorites: ${doujinList[tempReact].favorites}`)
            .setImage(doujinList[tempReact].cover.url) 
            .setColor('GREEN')
           await pesan.edit({content: 'pilih angka atau react yang mau dibaca:\n' + idk, embed})
          }
          else {
            await tempCollector.stop()
            await tempAwait.stop()
            await pesan.reactions.removeAll()
            await pesan.react('❌')
            await pesan.react('⬅️')
            await pesan.react('➡️')
            
            embed = new MessageEmbed()
            .setTitle(doujinList[tempReact].titles.pretty)
            .setImage(doujinList[tempReact].cover.url) 
            .setColor('GREEN')
            .setFooter(`halaman 1 dari ${doujinList[tempReact].pages.length}`)
            await pesan.edit({content: 'selamat membaca ||dan ingat dosa||', embed})
            let collector = await pesan.createReactionCollector(filter, {time: 1000 * 900})
            
            collector.on('collect', async (r, u) => {
              if (r.emoji.name == '⬅️' && currentReact-1 >= 0) currentReact -= 1
              if (r.emoji.name == '➡️' && currentReact+1 <= doujinList[tempReact].pages.length) currentReact += 1
              if (r.emoji.name == '❌') { await pesan.delete(); await collector.stop(); reject() }
              embed = new MessageEmbed()
                .setTitle(doujinList[tempReact].titles.pretty)
                .setColor('GREEN')
                .setImage(doujinList[tempReact].pages[currentReact].url)
                .setFooter(`Halaman ke ${currentReact+1} dari ${doujinList[tempReact].pages.length}`)
              await pesan.edit({content: 'selamat membaca ||dan ingat dosa||', embed})
            })
            
            collector.on('end', async () => {
              await pesan.edit({content: '*pesan ini telah expired.*', embed})
            })
            
          }
          
        })
      }
      
    })
  }
}

module.exports = nhentai
