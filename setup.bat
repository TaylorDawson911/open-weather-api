@echo off
cls
echo ==========================================
echo Health Advice Group Installer 22/3/2023
echo ==========================================
echo .
echo .
rem ------------------------------------------------
echo Attempting to install Xampp
set "dir_path=C:\xampp"
if exist "%dir_path%" (
	echo Xampp already installed, installing node modules...
) else (
	start powershell.exe -NoExit -Command "winget install xampp"
)
start powershell.exe -NoExit -Command "cd backend; npm i"
start powershell.exe -NoExit -Command "cd frontend; npm i"


echo Done.
pause