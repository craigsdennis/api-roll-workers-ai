#!/bin/bash
curl -X POST -N \
  'https://api-roll.craigsdemos.workers.dev/api/pun' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "situation": "'"$1"'",
  "category": "'"$2"'"
}'
