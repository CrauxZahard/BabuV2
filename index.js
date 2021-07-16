const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES], partials: ['MESSAGE', 'REACTION', 'CHANNEL'] });
const { token } = require('./token.json');

require('./handler/events.js')(client);
require('./handler/file.js')(client);
require('./handler/rpg.js')(client);

client.db = db
client.login(token)
