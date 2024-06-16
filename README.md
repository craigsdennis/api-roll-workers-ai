# API Roll

[<img src="https://img.youtube.com/vi/GRpwVMkVmKo/0.jpg">](https://youtu.be/GRpwVMkVmKo "API Roll (Happy Father's Day) - YouTube walkthrough")


This is a [Workers AI](https://developer.cloudflare.com/workers-ai/) application that I made for my dad for Father's Day. You can use it though.

## Using the command line wrappers

### Mac

```bash
chmod u+x pun.sh
./pun.sh "This is the situation" "father's day"
```

### Windows

#### .bat

```bash
pun.bat "This is the situation" "father's day"
```

#### PowerShell

```bash
# Open PowerShell as Administrator
# Set execution policy to RemoteSigned
Set-ExecutionPolicy RemoteSigned

# Run the script with parameters
.\pun.ps1 -situation "My daughter is in a play about Willy Wonka and she is nervous she might forget her lines." -category "performance"
```

You might need to allow this

## Installation

```bash
npm install
```

## Develop

```bash
npm run dev
```

## Deploy

```bash
npm run deploy
```
