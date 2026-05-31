# Deploy engagement site to GitHub Pages
# Run: Right-click -> Run with PowerShell  (or: powershell -File deploy.ps1)

Set-Location $PSScriptRoot

Write-Host "`n=== Engagement Site Deploy ===" -ForegroundColor Cyan
Write-Host "Repo: https://github.com/mohamedsaeed581/engagement`n"

if (-not (Test-Path ".git")) {
    git init
    git branch -M main
    git remote add origin https://github.com/mohamedsaeed581/engagement.git
}

git add .
git status

$msg = "Update engagement invitation site"
git commit -m $msg 2>$null
if ($LASTEXITCODE -ne 0) { Write-Host "Nothing new to commit (or already committed)." -ForegroundColor Yellow }

Write-Host "`nPushing to GitHub... Sign in when the browser/login window appears.`n" -ForegroundColor Green
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSUCCESS! Enable GitHub Pages:" -ForegroundColor Green
    Write-Host "1. Open: https://github.com/mohamedsaeed581/engagement/settings/pages"
    Write-Host "2. Source: Deploy from a branch"
    Write-Host "3. Branch: main  |  Folder: / (root)"
    Write-Host "4. Click Save`n"
    Write-Host "Your live site (wait 1-2 min):" -ForegroundColor Cyan
    Write-Host "https://mohamedsaeed581.github.io/engagement/`n"
} else {
    Write-Host "`nPush failed. Create a token at:" -ForegroundColor Red
    Write-Host "https://github.com/settings/tokens (check 'repo' scope)"
    Write-Host "Then run: git push -u origin main"
    Write-Host "Username: mohamedsaeed581"
    Write-Host "Password: paste your token`n"
}
