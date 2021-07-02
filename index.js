const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = require('./token.json');
const { Database } = require('dbdjs.db');

//database setup
const db = new Database({
  path: './databases/',
  tables: [{name: 'main'}]
})

db.once('ready', () => { console.log('database is ready') })
db.connect()
//end of database setup

client.once('ready', () => { console.log(`${client.user.tag} is ready`) })

//command handler
client.commands = new Discord.Collection();
const commandFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFile) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}
//end of command handler

client.on('message', msg => {
if(msg.author.bot || !msg.content.startsWith('-')) return;
  const args = msg.content.slice('-'.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  if(!client.commands.has(cmd)) return;
  
  try {
    //run the command
    client.commands.get(cmd).run(client, msg, args);
  }
  catch (error) {
    msg.channel.send(':x: an error hass occured!' + `\n${error}`);
  } 
  
})

client.login(token.token)
