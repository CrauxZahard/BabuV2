const Discord = require('discord.js');
const { API } = require('nhentai');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES], partials: ['MESSAGE', 'REACTION', 'CHANNEL'] });
const { token } = require('./token.json');
let hentai = require('./Util/hentai.js');

require('./handler/database.js')(client);
require('./handler/events.js')(client);
require('./handler/file.js')(client);


client.db = require('quick.db');
client.hentai = new API()
client.nh = new hentai(client)
client.login(token)
