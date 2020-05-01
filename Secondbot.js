const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const schedule = require('node-schedule');

const client = new Discord.Client();
client.commands = new Discord.Collection();

//Getting Ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
	client.user.setStatus('available')
	client.user.setPresence({
		game: {
			name: 'the towncrier',
			type: "WATCHING"
		}
	});
});

//Deal With Errors
client.on('error', console.error);

//Morning Greetings

var morningDay1 = schedule.scheduleJob('0 8 * * 1', function(){
	client.channels.get('575342498063319102').send("Heyyyyyy! How's everyone doing this morning?");
});

var morningDay5 = schedule.scheduleJob('0 8 * * 5', function(){
	client.channels.get('575342498063319102').send("Heeeeeeey Good evening! Hm? It's gotta be evening somewhere riiight!?");
});

//Custom-Commands

	//Constructs custom command collections

	const customcommandFiles = fs.readdirSync('./custom-commands').filter(file => file.endsWith('.js'));

	for (const file of customcommandFiles) {
		const command = require(`./custom-commands/${file}`);
		client.commands.set(command.name, command);
	}
	
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

client.on('guildMemberAdd', (member) => {
	member.guild.channels.find(c => c.id === "601509396555497504").send(`Greetings <@${member.user.id}>! Welcome to our Kingdom, if you're looking for any information please check out ${client.channels.find(c => c.id === "575390364437839882").toString()} information.`);
});


//Bot logs in
client.login(token);

