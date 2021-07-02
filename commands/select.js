module.exports = {
  name: 'select',
  run: async (client, message, args) => {
    const discord = require('discord.js');
    const row = new discord.MessageActionRow()
			.addComponents(
				new discord.MessageSelectMenu()
					.setCustomID('select')
					.setPlaceholder('Nothing selected')
					.setMinValues(2)
					.setMaxValues(3)
					.addOptions([
						{
							label: 'Option 1',
							description: 'a description of first option',
							value: 'first_option',
              emoji: {
                name: 'SumiBye',
                id: '844192593516822548',
                animated: true
              }
						},
						{
							label: 'Option 2',
							description: 'a description of second option',
							value: 'second_option',
              emoji: {
                name: 'ngikngok',
                id: '819960401408163840'
              }
						},
						{
							label: 'Option 3',
							description: 'a description of third option',
							value: 'third_option',
						},
					]),
			);
    
    await message.channel.send({content: 'testing', components: [row] })
  }
}
