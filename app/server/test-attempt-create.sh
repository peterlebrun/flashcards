curl -X POST \
     -H 'Content-Type: application/json' \
     -H 'Express-Auth-Token: FAKE-AUTH-TOKEN' \
     -H 'cache-control: no-cache' \
     -d '{"flashcard_id": "1", "review_success": "true"}' \
     http://localhost:8888/api/attempt/create
