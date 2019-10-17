curl -X POST \
     -H 'Content-Type: application/json' \
     -H 'Express-Auth-Token: FAKE-AUTH-TOKEN' \
     -H 'cache-control: no-cache' \
     -d '{"cards": { "cards": [{"front": "testfront1", "back": "testback1"}, {"front": "testfront2", "back": "testback2"}]}}' \
     http://localhost:8888/api/flashcard/create-multi
