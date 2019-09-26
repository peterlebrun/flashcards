curl -X POST \
     -H 'Content-Type: application/json' \
     -H 'Express-Auth-Token: FAKE-AUTH-TOKEN' \
     -H 'cache-control: no-cache' \
     -d '{"front": "testfront", "back": "testback"}' \
     http://localhost:8888/api/flashcard/create
