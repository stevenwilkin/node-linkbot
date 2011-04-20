#!/bin/bash

# (re)create the sqlite db by running all the sql scripts under db/

DB_DIR=$(cd "`dirname $0`/../db" && pwd)
DB="$DB_DIR/links.db"
FILES=`ls -1 $DB_DIR/*.sql`

echo "creating: $DB"

for FILE in $FILES
do
	echo "running: $FILE"
	cat $FILE | sqlite3 $DB
done

echo "done"
