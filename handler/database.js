module.exports = client => {
  client.db.server = new client.db.table('server')
  client.db.user = new client.db.table('user')
  client.db.userWeapons = new client.db.table('weapon')
  client.db.userStats = new client.db.table('stats')
}
