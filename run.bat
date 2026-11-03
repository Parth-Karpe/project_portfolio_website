@echo off
echo Starting ProjectGate AI...
cd /d "%~dp0"
python -m http.server 4174 --bind 127.0.0.1 --directory dist
pause
