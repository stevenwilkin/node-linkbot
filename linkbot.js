#!/usr/bin/env node

var irc = require('irc');

const
	SERVER = 'irc.freenode.net',
	CHANNEL = '#biscuitbot',
	NICK = 'biscuitbot';

var start = new Date();


bot = {

	client: null,


	/**
	 * Initialise the irc bot
	 */
	init: function() {

		console.log('> starting bot');

		var client = bot.client = new irc.Client(SERVER, NICK, {
			channels: [CHANNEL]
		});
		
		client.on('join', function() {
			console.log('> joined room');
		});
		
		
		client.on('message' + CHANNEL, bot.message);
	},


	/**
	 * Process messages from irc channel
	 *
	 * @param from    string Nick originating the message
	 * @param message string Content of the message
	 */
	message: function(from, message) {
		var matches = message.match(/^!(\w+)/)
		if(matches) {
			var command = matches[1];
			console.log('> command: %s', command);
			if(command.match(/uptime/i)) {
				var uptime = new Date - start;
				bot.client.say(CHANNEL, uptime + 's');
			}
			return;
		}
	
		var matches = message.match(/(https?\:\/\/[^ ]+)/);
		if(matches) {
			console.log('> link mentioned');
			bot.client.say(CHANNEL, matches[1]);
		}
	}
}


bot.init();
