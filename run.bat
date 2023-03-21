@echo off
echo Starting Xampp Server...
start powershell.exe -NoExit -Command "cd C:\xampp; start mysql_start.bat"
start powershell.exe -NoExit -Command "cd frontend; npm run start"
start powershell.exe -NoExit -Command "cd backend; node app.js"
