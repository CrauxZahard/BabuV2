const axios = require('axios')
const { token } = require('../token.json')
class SlashCommand {
  constructor(client) {
    this.client = client
  }
  
  async addCommand(data) {
    let commandData = {
      name: data.name,
      type: 1,
      description: data.description,
      options: data.options
    }
    
    let req = await this.client.api.applications(this.client.id).commands.post({
      data: commandData
    }).catch(err => {
      console.log(err)
      return;
    })
    return console.log(req)
  }
  
  updateCommand(commandId, newData) {
    axios.patch(`https://discord.com/api/v8/applications/866931644983148554/commands/${commandId}`, newData, {
    headers: {
      Authorization: `Bot ${token}`
    }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  
  deleteCommand(commandId) {
    axios.delete(`https://discord.com/api/v8/applications/866931644983148554/commands/${commandId}`, {
      headers: {
        Authorization: `Bot ${token}`
      }
    })
  }
  
}

module.exports = SlashCommand
