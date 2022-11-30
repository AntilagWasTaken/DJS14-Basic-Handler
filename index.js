
require('dotenv').config();


const { Client, Collection } = require('discord.js');
const client = new Client({
	allowedMentions: {
		parse: ['users', 'roles'],
		repliedUser: false,
	},
	intents: [512, 1],
});


['commands'].forEach(x => (client[x] = new Collection()));
['command', 'event'].forEach(x => require(`./handlers/${x}`)(client));


client.login(process.env.TOKEN);
