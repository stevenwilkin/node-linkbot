#!/usr/bin/env node

var
	irc = require('irc'),
	sqlite = require('sqlite');

const
	SERVER = 'irc.freenode.net',
	CHANNEL = '#biscuitbot',
	NICK = 'biscuitbot';

var start = new Date();
var db = new sqlite.Database();


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
			if(command.match(/links/i)) {
				bot.displayLinks(3);
				return;
			}
			return;
		}
	
		var matches = message.match(/(https?\:\/\/[^ ]+)/);
		if(matches) {
			console.log('> link mentioned');
			bot.addLink(matches[1], from);
			return;
		}
	},


	/**
	 * Add a link to the database
	 *
	 * @param link   string Link URL
	 * @param author string Nick originating the link
	 */
	addLink: function(link, author) {
		db.execute(
			'INSERT INTO links (link, author, date) VALUES (?, ?, DATETIME());',
			[link, author],
			function(error, rows) {
				if(error) {
					console.log('> error adding link');
				} else {
					console.log('> link added');
				}
			}
		);
	},


	/**
	 * Display the previous 'n' mentioned links
	 *
	 * @param n integer Number of links to display
	 */
	displayLinks: function(n) {
		console.log('> retrieving %d links', n);
		db.execute(
			'SELECT link FROM links ORDER BY date DESC LIMIT ?;',
			[n],
			function(error, rows) {
				if(error) {
					console.log('> db select failed');
					return;
				}
				for(i in rows) {
					var link = '[' + i + '] ' + rows[i].link;
					bot.client.say(CHANNEL, link);
				}
			}
		);
	}
}


db.open('./db/links.db', function(error) {
	if(error) {
		console.log('> error initialising database');
	} else {
		bot.init();
	}
});
