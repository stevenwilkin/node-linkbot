# node-linkbot

A simple IRC bot developed with Node. Joins a specified room and logs mentioned URLs for later retrieval

## Dependencies

* `irc` and `sqlite` Node modules:

		# npm install irc sqlite

* `sqlite3` binary

## Running

### Create the database

	./bin/create_database.sh

### Launch the bot

	./linkbot.js
