module.exports.name = "nhentai"
module.exports.aliases = ["doujin", "nh", "search", "s"]
module.exports.cooldown = 10
module.exports.options = [{
  name: 'Query',
  type: 3,
  description: 'a name of character/series you want to search.',
  required: false
}, {
  name: 'Code',
  type: 4,
  description: 'a spesific "nuclear code" to search.',
  required: false
}]

module.exports.code = async (client, message, args) => {
  let number = parseInt(args[0])
  
  if (!isNaN(number) && args.length == 1) await client.nh.getCode(number, message)
  else { await client.nh.getSearch(args.join(' '), message) }
}
