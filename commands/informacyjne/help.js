const { EmbedBuilder } = require('discord.js');

module.exports = {
	category: 'informacyjne',
	name: 'help',
	description: '..',
	async run(client, interaction, options) {

		const embed = new EmbedBuilder()
			.setAuthor({ name: `${client.user.username} - POMOC`, iconURL: client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 })})
			.setColor(process.env.FLUENT_RED)

		interaction.reply({ embeds: [embed] });

	},
};