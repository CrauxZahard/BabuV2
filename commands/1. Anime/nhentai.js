module.exports.name = "nhentai"
module.exports.aliases = ["doujin", "nh", "search", "s"]
moduld.exports.cooldown = 10

module.exports.code = async (client, message, args) => {
  
  let nuclearCode = parseInt(args[0])
  if (nuclearCode) {
    let doujin = await client.nhentai.fetchDoujin(nuclearCode)
    if (!doujin) return message.channel.send(':x: kodenya nggak valid.')
    let currentPage = 0
    let hentaiMessage = await message.channel.send({title: `${doujin.titles.pretty}`,
                          thumbnail: `${doujin.cover.url}`,
                          image: {url: `${doujin.pages[currentPage].url}`}
    })
    
    let collector = hentaiMessage.createReactionCollector((reaction, user) => reaction.emoji.name == '➡️' )

  
  
  }
