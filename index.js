const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.json')

client.once('ready', () => { console.log(`${client.user.tag}`) })

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
