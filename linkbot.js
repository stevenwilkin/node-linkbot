#!/usr/bin/env node

var irc = require('irc');

const
	SERVER = 'irc.freenode.net',
	CHANNEL = '#biscuitbot',
	NICK = 'biscuitbot';

console.log('> starting bot');

var start = new Date();

var client = new irc.Client(SERVER, NICK, {
	channels: [CHANNEL]
});

client.on('join', function() {
	console.log('> joined room');
});


client.on('message' + CHANNEL, function(from, message) {
	var matches = message.match(/^!(\w+)/)
	if(matches) {
		var command = matches[1];
		console.log('> command: %s', command);
		if(command.match(/uptime/i)) {
			var uptime = new Date - start;
			client.say(CHANNEL, uptime + 's');
		}
		return;
	}

	var matches = message.match(/(https?\:\/\/[^ ]+)/);
	if(matches) {
		console.log('> link mentioned');
		client.say(CHANNEL, matches[1]);
	}
});
