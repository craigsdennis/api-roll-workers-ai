@echo off
setlocal enabledelayedexpansion

set "situation=%~1"
set "category=%~2"

rem Create JSON payload
set "json={\"situation\":\"!situation!\",\"category\":\"!category!\"}"

rem Send POST request
curl -X POST -N ^
  "https://api-roll.craigsdemos.workers.dev/api/pun" ^
  --header "Accept: */*" ^
  --header "Content-Type: application/json" ^
  --data-raw "!json!"

endlocal
