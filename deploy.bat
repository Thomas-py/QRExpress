@echo off
set /p msg="Mensaje para el commit: "
git add .
git commit -m "%msg%"
git push origin main
pause
