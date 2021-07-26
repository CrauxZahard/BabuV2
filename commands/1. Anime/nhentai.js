module.exports.name = "nhentai"
module.exports.aliases = ["doujin", "nh", "search", "s"]
module.exports.cooldown = 10

module.exports.code = async (client, message, args) => {
  if (!args) return message.chhannel.send(':x: mau nyari apa?')
  if (args.length > 1) {
    //means they are searching a title
    let doujinList = await client.hentai.search(args.join(' '))
    if(!doujinList) return message.channel.send(':x: nggak nemuin judul begitu.')
    
    /* message content placeholder
       will look like smth like this:
       1.) Emilia raped
       2.) Emilia fucked
       3.) Emilia NTR-ed
    */
    let placeHolder = []
    doujinList.forEach((d, n) => {
    placeHolder.push(`${n+1}). ${d.titles.pretty}\n`)
    })
    
    let pesan = await message.channel.send('pilih angka yg mau dibaca bang:\n' + placeHolder)
    let messageCollect = await message.channel.createMessageCollector((msg) => msg.author.id == message.author.id, {time: 20000, max: 1})
    
    messageCollect.on('collect', (msg) => {
     messageCollect.stop()
     let angka = parseInt(msg.content);
     if (!angka || angka > doujinList.length) return message.channel.send(':x: angka nggak valid.')
     pesan.edit('selamat membaca!', {title: doujinList[angka-1].titles.pretty,
                                     thumbnail: doujinList[angka-1].cover.url,
                                     image: {url: doujinList[angka-1].pages[0].url}
                                    })
      
      const filter = async (reaction, user) => {
        if (reaction.emoji.name == '➡️' && user.id == message.author.id) return true
        if (reaction.emoji.name == '⬅️' && user.id == message.author.id) return true
        return false
      }
      
      let reactCollect = await pesan.createReactionCollector(filter, {time: 1000 * 900})
      let currentPage = 0
      reactCollect.on('collect', async (r, u) => {
        if (r.emoji.name == '➡️') {
          currentPage = currentPage + 1
          await pesan.edit('selamat membaca!', {title: doujinList[angka-1].titles.pretty,
                                          thumbnail: doujinList[angka-1].cover.url,
                                          image: {url: doujinList[angka-1].pages[currentPage].url}
                                         })
        }
        
        else {
          currentPage = currentPage - 1
          await pesan.edit('selamat membaca!', {title: doujinList[angka-1].titles.pretty,
                                          thumbnail: doujinList[angka-1].cover.url,
                                          image: {url: doujinList[angka-1].pages[currentPage].url}
                                          })
        }
        
      })
      
    })
    
  }
  
  else { 
  //means they are using 6-digit number
    console.log('smth')
  }
}
