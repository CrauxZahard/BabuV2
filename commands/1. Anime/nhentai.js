module.exports.name = "nhentai"
module.exports.aliases = ["doujin", "nh", "search", "s"]
module.exports.cooldown = 10
⬅️➡️❌✅

module.exports.code = async (client, message, args) => {
  let tryNumb = parseInt(args[0]);
  let reactCollector, pesan, msgCollector, angka, doujinList;
  let currentPage = 0;
  
  let filterReact = (reaction, user) => {
    let abcd = reaction.emoji.name == '⬅️' ? 1 : reaction.emoji.name == '➡️' ? 1 : reaction.emoji.name == '❌' ? 1 : 0;
    let efgh = user.id == message.author.id ? 1 : 0;
    if (abcd == 1 && efgh == 1) return true;
    return false;
  }
  
  if (tryNumb && args.length > 1) {
    //searching a title
    doujinList = await client.hentai.search(args.join(' '))
    if (!doujinList) {
      //no result found
      return message.channel.send(':x: ga ada judul begitu.')
    }
    else if (doujinList.length == 1) {
      //1 result found
       pesan = message.channel.send({content: 'selamat membaca! ||dan ingat dosa||', embed: {
        type: 'rich',
        color: 'RANDOM',
        title: doujinList[0].titles.pretty,
        image: {url: doujinList[0].pages[0].url},
        thumbnail: {url: doujinList[0].cover.url},
        footer: {text: `halaman ${currentPage+1} dari ${doujinList[0].pages.length}`}
      }
                                       })
      
      reactCollector = await pesan.createReactionCollector(filterReact, {time: 1000 * 900})
    }
    else {
      //multiple result found
    }
  }
  else if (tryNumb && args.length == 1) {
    //6 digit code
    
  }
  else {
    return message.channel.send('pen cari apa?')
  }
  
  reactCollector.on('collect', (reaction, user) => {
    if (reaction.emoji.name == '⬅️') {currentPage -= 1 };
    if (reaction.emoji.name == '➡️') {currentPage += 1};
    if (reaction.emoji.name == '❌') {await pesan.delete(); return true}
    
    pesan.edit({content: 'selamat membaca! ||selalu ingat dosa ya||', embed: {
      type: 'rich',
      color: 'RANDOM',
      title: doujinList[angka ? angka : 0].titles.pretty,
      image: {url: doujinList[angka ? angka : 0].pages[currentPage].url },
      thumbnail: {url: doujinList[angka ? angka: 0].cover.url},
      footer: {text: `halaman ${currentPage+1} dari ${doujinList[angka ? angka : 0].pages.length}`}
    }})
  })
  
}
