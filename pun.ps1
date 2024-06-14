param (
    [string]$situation,
    [string]$category
)

$body = @{
    situation = $situation
    category  = $category
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri 'https://api-roll.craigsdemos.workers.dev/api/pun' -Headers @{
    'Accept' = '*/*'
    'Content-Type' = 'application/json'
} -Body $body -ContentType 'application/json'
