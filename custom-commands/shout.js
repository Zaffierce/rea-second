module.exports = {
	name: 'shout',
	description: 'Announces to another channel your message',
	execute(message, args) {
		
		channel = message.guild.channels.get(args[0].slice(2, -1))
		
			mymessage =args.splice(1).join(" ")
			
			channel.send(mymessage)
			
		
	},
};