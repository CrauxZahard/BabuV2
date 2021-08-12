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
      
      let pesan = message.channel.send({content: 'selamat membaca ||dan ingat dosa||', embeds: [embed]})
      let filter = (reaction, user) => {
            let abcd = reaction.emoji.name == '➡️' ? 1 : reaction.emoji.name == '⬅️' ? 1 : reaction.emoji.name == '❌' ? 1 : 0
            let efgh = user.id == message.author.id ? 1 : 0
            if (abcd == 1 && efgh == 1) return true
            return false
          }
           
      let collector = pesan.createReactionCollector({filter: filter, time: 1000 * 900})
      
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
        await pesan.edit({content: 'selamat membaca ||dan ingat dosa||', embeds: [embed]})
      })
      
      collector.on('end', async () => {
        await pesan.edit({content: '*pesan ini telah expired.*', embeds: [embed]})
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
        let pesan = await message.channel.send({content: 'selamat membaca ||dan ingat  dosa||', embeds: [embed]})
        
        //reaction baca
        await pesan.react('❌')
        await pesan.react('⬅️')
        await pesan.react('➡️')
        
        let collector = pesan.createReactionCollector({filter: filter, ime: 1000 * 900})
        
        collector.on('collect', async (r, u) => {
        if (r.emoji.name == '⬅️' && currentReact-1 >= 0) currentReact -= 1
        if (r.emoji.name == '➡️' && currentReact+1 <= doujinList[0].pages.length) currentReact += 1
        if (r.emoji.name == '❌') { await pesan.delete(); await collector.stop(); reject() }
        embed = new MessageEmbed()
                .setTitle(doujinList[0].titles.pretty)
                .setColor('GREEN')
                .setImage(doujinList[0].pages[currentReact].url)
                .setFooter(`Halaman ke ${currentReact+1} dari ${doujinList[0].pages.length}`)
        await pesan.edit({content: 'selamat membaca ||dan ingat dosa||', embeds: [embed]})
        })
        
        collector.on('end', async () => {
          await pesan.edit({content: '*pesan ini telah expired.*', embeds: [embed]})
          fullfill()
        })
      }
      
      else {
        //multiple result
        let tempReact = 0
        let embed = new MessageEmbed()
        .setTitle(doujinList[tempReact].titles.pretty)
        .setImage(doujinList[tempReact].cover.url)
        .setDescription(`Tags: ${doujinList[tempReact].tags.all.map(x =>  x.name).join(', ')}\n\nFavorites: ${doujinList[tempReact].favorites}`)
        .setColor('GREEN')
        let idk = doujinList.map((d, i) => `${i+1}.) ${d.titles.pretty}`).join('\n').replace(`${tempReact+1}.)`, `--> ${tempReact+1}.)`)
        let pesan = await message.channel.send({content: 'pilih angka atau react yang mau dibaca:\n' + idk, embeds: [embed]})
        
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
        
        let msgFilter = (m) => {
          let numb = parseInt(m.content) - 1
          let isNumb = !isNaN(numb)
          if (isNumb && numb <= doujinList.length - 1) return true
          return false
        }
        
        let tempCollector = await pesan.createReactionCollector({filter: filter2, time: 1000 * 900})
        let tempAwait = await message.channel.createMessageCollector({filter: msgFilter,
          max: 1,
          time: 1000 * 30
        })
        
        tempAwait.on('collect', async (m) => {
          let index = parseInt(m.content) - 1
          embed = new MessageEmbed()
          .setTitle(doujinList[index].titles.pretty)
          .setImage(doujinList[index].pages[currentReact].url)
          .setFooter(`halaman 1 dari ${doujinList[index].pages.length}`)
          .setColor('GREEN')
          
          await tempCollector.stop()
          await pesan.reactions.removeAll()
          await pesan.edit({content: 'selamat membaca! ||dan ingat dosa||', embeds: [embed]})
          await pesan.react('❌')
          await pesan.react('⬅️')
          await pesan.react('➡️')
          
          let doujinCollector = await pesan.createReactionCollector({filter: filter, time: 1000 * 900})
          
          doujinCollector.on('collect', async (r, u) => {
              if (r.emoji.name == '⬅️' && currentReact-1 >= 0) currentReact -= 1
              if (r.emoji.name == '➡️' && currentReact+1 <= doujinList[index].pages.length) currentReact += 1
              if (r.emoji.name == '❌') { await pesan.delete(); await doujinCollector.stop(); reject() }
              embed = new MessageEmbed()
                .setTitle(doujinList[index].titles.pretty)
                .setColor('GREEN')
                .setImage(doujinList[index].pages[currentReact].url)
                .setFooter(`Halaman ke ${currentReact+1} dari ${doujinList[index].pages.length}`)
              await pesan.edit({content: 'selamat membaca ||dan ingat dosa||', embeds: [embed]})
            })
          
        })
        
        tempCollector.on('collect', async (r, u) => {
          if (r.emoji.name == '⬆️' || r.emoji.name == '⬇️' || r.emoji.name == '❌') {
            if (r.emoji.name == '⬆️' && tempReact >= 1) tempReact -= 1
            if (r.emoji.name == '⬇️' && tempReact <= doujinList.length - 2) tempReact += 1
            if (r.emoji.name == '❌') { await pesan.delete(); await tempCollector.stop(); await tempAwait.stop(); reject() }
            embed = new MessageEmbed()
            .setTitle(doujinList[tempReact].titles.pretty)
            .setDescription(`Tags: ${doujinList[tempReact].tags.all.map(x => x.name).join(', ')}\n\nFavorites: ${doujinList[tempReact].favorites}`)
            .setImage(doujinList[tempReact].cover.url) 
            .setColor('GREEN')
            idk = doujinList.map((d, i) => `${i+1}.) ${d.titles.pretty}`).join('\n').replace(`${tempReact+1}.)`, `--> ${tempReact+1}.)`)
           await pesan.edit({content: 'pilih angka atau react yang mau dibaca:\n' + idk, embeds: [embed]})
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
            await pesan.edit({content: 'selamat membaca ||dan ingat dosa||', embeds: [embed]})
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
              await pesan.edit({content: 'selamat membaca ||dan ingat dosa||', embeds: [embed]})
            })
            
            collector.on('end', async () => {
              await pesan.edit({content: '*pesan ini telah expired.*', embeds: [embed]})
            })
            
          }
          
        })
      }
      
    })
  }
}

module.exports = nhentai
