const { EmbedBuilder } = require('discord.js');
const { createErrEmbed } = require('../../functions.js');

module.exports = {
	category: 'informacyjne',
	name: 'commands',
	description: 'Sends a message with all bot commands',
		options: [
		{
			name: 'command_name',
			description: 'Detailed information about the command',
			type: 3,
			required: false,
		},
	],
	async run(client, interaction, options) {

		if (!options[0]) {
			getAll(client, interaction);
		}
		else {
			getCMD(client, interaction, options[0].value);
		}

	},
};

async function getCMD(client, interaction, input) {

	const embedCmd = new EmbedBuilder();
	let info = `❌ Command information not found \`${input}\``;

	if (!client.commands.has(input)) {
		return interaction.reply({
			embeds: [createErrEmbed(info)],
			ephemeral: true,
		});
	}

	const cmd = client.commands.get(input);

	if (cmd.name) info = `Command name: \`${cmd.name}\``;
	if (cmd.description) info += `\nOpis: \`${cmd.description}\``;

	if (cmd.options) {
		const formatedoptions = [];
		cmd.options.forEach(y => {
			if (!y.required) { formatedoptions.push(`[${y.name}]`); }
			else { formatedoptions.push(`<${y.name}>`); }
		});
		info += `\nArgumenty: \`${formatedoptions.join(' ')}\``;
		embedCmd.setFooter('Syntax: <> = required, [] = optional');
	}

	if (cmd.userPerms) info += `\nPermissions required: ${cmd.userPerms.map(a => `\`${a}\``).join(', ')}`;

	embedCmd.setDescription(info).setColor(`0x${Math.floor(Math.random()*16777215).toString(16)}`);
	interaction.reply({ embeds: [embedCmd] });
}

function getAll(client, interaction) {
	const embed = new EmbedBuilder()
		.setAuthor({ name: 'AntiLAG', iconURL: ''})
		.setColor(process.env.INFO_BLUE)
		.setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }));

	const categories = [...new Set(client.commands.map(x => x.category))]
		.filter(x => x)
		.map(x => x.toLowerCase());

	const commands = category => {
		return client.commands
			.filter(cmd => cmd.category === category)
			.map(cmd => `\`${cmd.name}\``)
			.join(', ');
	};

	
	let fields = []
	for (let i = 0; i < categories.length; i++) {
		fields.push({ name: `${categories[i][0].toUpperCase() + categories[i].slice(1)}`, value: `${commands(categories[i])}`});
	}
	embed.addFields(fields);

	return interaction.reply({ embeds: [embed] });
}