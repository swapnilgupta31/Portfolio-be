@echo off
REM Load .env and start the API (handles values with spaces)
for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
    if not "%%A"=="" set "%%A=%%B"
)
dotnet run
