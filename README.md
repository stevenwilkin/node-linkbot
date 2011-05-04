# node-linkbot

A simple IRC bot developed with Node. Joins a specified room and logs mentioned URLs for later retrieval

## Dependencies

* `irc` and `sqlite` Node modules:

		# npm install irc sqlite

* `sqlite3` binary

## Running

### Create the database

	./bin/create_database.sh

### Configure

Copy `config.js-dist` to `config.js` and set the server, channel and nick you want
the bot to use

### Launch the bot

	./linkbot.js
