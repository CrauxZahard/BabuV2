module.exports.name = "nhentai"
module.exports.aliases = ["doujin", "nh", "search", "s"]
module.exports.cooldown = 10

module.exports.code = async (client, message, args) => {
  let number = parseInt(args[0])
  
  if (!isNaN(number) && args.length == 1) await client.nh.getCode(number, message)
  else { await client.nh.getSearch(args.join(' '), message) }
}
