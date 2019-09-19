#echo $(yarn -s uuid) > uuid
#cat test-db.sql | sqlite3 $(cat uuid).db
cat test-db.sql | sqlite3 data.db
