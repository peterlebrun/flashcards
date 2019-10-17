yarn serve &
sleep 1
./test-flashcard-create-multi.sh
fg
kill -2 $(jobs -p)
