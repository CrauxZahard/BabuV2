module.exports = client => {
  console.log(`${client.user.tag} is ready`)
  require('../handler/slashFile.js')(client)
}
