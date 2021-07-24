const axios = require('axios');
module.exports.name = 'kusonime'
module.exports.aliases = ['k', 'kuso']

module.exports.code = async (client, message, args) => {
let data = await axios.post(`https://kusonime.com/?s=${args.join('+')}&post_type=post`, {
  name: args.join('+')
})

if (!data) return message.channel.send('nothing found')
return message.channel.send(data)
}
