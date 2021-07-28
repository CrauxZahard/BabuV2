module.exports.name = "nhentai"
module.exports.aliases = ["doujin", "nh", "search", "s"]
module.exports.cooldown = 10
⬅️➡️

module.exports.code = async (client, message, args) => {
  let tryNumb = parseInt(args[0]);
  let collector, pesan;
  
  if (tryNumb && args.length > 1) {
    //searching a title
    let doujinList = await client.hentai.search(args.join(' '))
    if (!doujinList) {
      //no result found
      return message.channel.send(':x: ga ada judul begitu.')
    }
    else if (doujinList.length == 1) {
      //1 result found
       pesan = message.channel.send({content: 'selamat membaca!', embed: {
        color: 'RANDOM',
        title: doujinList[0].titles.pretty,
        image: {url: doujinList[0].pages[0].url},
        thumbnail: {url: doujinList[0].cover.url}
      }
                                       })
      pesan.createReactionCollector()
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
}
