module.exports = {
	category: 'informative',
	name: 'ping',
	description: 'Sends bot ping information.',
	async run(client, interaction, options) {

		interaction.reply({ content: `🏓 Pong! - ${client.ws.ping}ms` });

	},
};
