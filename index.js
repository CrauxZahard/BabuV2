const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES], partials: ['MESSAGE', 'REACTION', 'CHANNEL'] });
const { token } = require('./token.json');

require('./handler/client.js')(client);
require('./handler/rpg.js')(client);

client.login(token)
