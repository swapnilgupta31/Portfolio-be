# Kill any existing ContactApi process to release file lock
Get-Process -Name "ContactApi" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Milliseconds 500

# Load .env variables
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^#=][^=]*)=(.+)$') {
        [System.Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim(), 'Process')
    }
}

dotnet run
