module.exports = client => {
  client.db.set('dev', ['694573382380945529', '458114349286948864'])
  const { Collection } = require('discord.js')
  client.dev.ids = new Collection();
  
  client.db.get('dev').forEach(id => {
    client.dev.ids.set(id, id)
    console.log('developer ids: ' + client.dev.ids.map(x => x).join(', ') )
  })
  
  console.log(`${client.user.tag} is ready`)
}
