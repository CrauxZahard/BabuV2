module.exports.name = "nhentai"
module.exports.aliases = ["doujin", "nh", "search", "s"]
moduld.exports.cooldown = 10

module.exports.code = async (client, message, args) => {
  
  let nuclearCode = parseInt(args[0])
  let hentaiMessage;
  let currentPage = 0;
  let doujin;
  
  if (nuclearCode && args.length == 1) {
    doujin = await client.nhentai.fetchDoujin(nuclearCode)
    if (!doujin) return message.channel.send(':x: kodenya nggak valid.')
    hentaiMessage = await message.channel.send({title: doujin.titles.pretty,
                          thumbnail: doujin.cover.url,
                          image: {url: doujin.pages[currentPage].url}
    })
    }
  
   else {
     doujin = await client.nhentai.search(args.join(' '))
     let result = []
     let numb = 1
     
     doujin.forEach(dj => {
       result.push(`${numb}). ${doujin[numb-1].titles.pretty}`)
     })
     
     hentaiMessage = message.channel.send(`Pilih angka yang mau dibaca gan\n\n${result.join('\n')}`)
     let messageCollect = await message.channel.createMessageCollector((m) => m.author.id == message.author.id, {time: 15000, max: 1})
     
     messageCollect.on('collect', m => {
       let angka = parseInt(m.content)
       if (!angka && angka > doujin.length) {
         message.channel.send(':x: angka tidak valid')
         await hentaiMessage.delete()
       }
       
       else {
        doujin = await client.nhentai.fetchDoujin(doujin[angka-1].titles.pretty)
        hentaiMessage = await hentaiMessage.edit({title: doujin.titles.pretty,
                                                 thumbnail: doujin.cover.url,
                                                 image: {url: doujin.pages[currentPage].url}
                                                 })
       } 
     })
   }
    await hentaiMessage.react('⬅️')
    await hentaiMessage.react('➡️')
  
    let filter = (reaction, user) => {
      if (reaction.emoji.name == '➡️' && user.id == message.authoor.id) return true
      else if (reaction.emoji.name == '⬅️' && user.id == message.author.id) return true
      else { return false }
    }
    
    let collector = hentaiMessage.createReactionCollector(filter, {time: 1000 * 600})
    
    collector.on('collect', (reaction, user) => {
      if (reaction.emoji.name == '➡️') {
        currentPage += 1 
        await hentaiMessage.edit({title: doujin.titles.pretty,
                           thumbnail: doujin.cover.url,
                           image: {url: doujin.pages[currentPage].url} 
                           })
      }
      if (reaction.emoji.name == '⬅️') {
        currentPage -= 1 
        await hentaiMessage.edit({title: doujin.titles.pretty,
                           thumbnail: doujin.cover.url,
                           image: {url: doujin.pages[currentPage].url} 
                           })
      }
    })
  }
